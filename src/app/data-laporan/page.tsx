
"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Search, 
  Undo2, 
  Download, 
  MapPin, 
  Calendar, 
  Trash2, 
  LayoutGrid, 
  BarChart3,
  ChevronDown,
  User,
  Info
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, doc, deleteDoc } from "firebase/firestore"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"
import { Skeleton } from "@/components/ui/skeleton"

const MOCK_REPORTS = [
  {
    id: "mock-1",
    farmerName: "Ahmad Subagjo",
    farmerAddress: "Desa Topoyo, Mateng",
    puskeswan: "puskeswan-topoyo",
    officerName: "drh. Iqbal Djamil",
    birthDate: "2026-01-26",
    offspringSex: "betina",
    offspringCount: 1,
    breedingType: "inseminasi-buatan",
    damBreed: "Simmental",
    damEartag: "7601010022",
    isMock: true
  },
  {
    id: "mock-2",
    farmerName: "I Made Suardana",
    farmerAddress: "Kec. Karossa, Mateng",
    puskeswan: "puskeswan-topoyo",
    officerName: "drh. Iqbal Djamil",
    birthDate: "2026-01-25",
    offspringSex: "jantan",
    offspringCount: 1,
    breedingType: "kawin-alam",
    damBreed: "Bali",
    damEartag: "7601020055",
    isMock: true
  }
]

export default function DataLaporanPage() {
  const db = useFirestore()
  const [isMounted, setIsMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPuskeswan, setFilterPuskeswan] = useState("all")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const reportsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'reports'), orderBy('createdAt', 'desc'))
  }, [db])

  const { data: cloudReports, loading, error } = useCollection(reportsQuery)

  const allReports = useMemo(() => {
    return cloudReports.length > 0 ? cloudReports : MOCK_REPORTS;
  }, [cloudReports])

  const filteredReports = useMemo(() => {
    return allReports.filter((r: any) => {
      const searchStr = ((r.farmerName || "") + (r.officerName || "") + (r.farmerAddress || "")).toLowerCase()
      const matchSearch = searchStr.includes(searchQuery.toLowerCase())
      const matchPuskeswan = filterPuskeswan === "all" || r.puskeswan === filterPuskeswan
      return matchSearch && matchPuskeswan
    })
  }, [allReports, searchQuery, filterPuskeswan])

  const handleDelete = (reportId: string, isMock?: boolean) => {
    if (isMock) {
      toast({ title: "Data Contoh", description: "Data contoh tidak dapat dihapus." })
      return
    }
    if (!confirm("Hapus laporan ini?")) return;
    const docRef = doc(db, 'reports', reportId);
    deleteDoc(docRef).catch(async (err) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({ path: docRef.path, operation: 'delete' }));
    });
    toast({ title: "Laporan Dihapus", description: "Data telah dihapus dari cloud." });
  }

  if (!isMounted) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto pb-24 relative">
      <div className="fixed left-6 bottom-10 z-[60] flex flex-col items-center gap-2 md:hidden">
        <Link href="/">
          <Button variant="ghost" size="icon" className="size-12 rounded-full bg-[#064E3B] text-white shadow-lg border-2 border-white">
            <Undo2 className="size-6" />
          </Button>
        </Link>
      </div>

      <div className="px-4 md:px-0">
        <Tabs defaultValue="tabel" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#F1F5F9] rounded-xl p-1 h-14 mb-8">
            <TabsTrigger 
              value="tabel" 
              className="rounded-lg data-[state=active]:bg-[#FBBF24] data-[state=active]:text-black font-bold flex items-center gap-2 text-muted-foreground transition-all"
            >
              <LayoutGrid className="size-5" />
              Tabel
            </TabsTrigger>
            <TabsTrigger 
              value="statistik" 
              className="rounded-lg data-[state=active]:bg-[#FBBF24] data-[state=active]:text-black font-bold flex items-center gap-2 text-muted-foreground transition-all"
            >
              <BarChart3 className="size-5" />
              Statistik
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tabel" className="space-y-6">
            <div className="hidden md:flex justify-between items-center mb-6">
              <h1 className="text-3xl font-headline font-bold text-[#064E3B]">Arsip Laporan</h1>
              <Button className="bg-[#064E3B] text-white rounded-xl gap-2 font-bold">
                <Download className="size-5" /> Ekspor
              </Button>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden mb-4">
              <CardContent className="p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input 
                      placeholder="Cari..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#F3F4F6] border-none rounded-xl h-11 pl-12 font-medium"
                    />
                  </div>
                  <Select value={filterPuskeswan} onValueChange={setFilterPuskeswan}>
                    <SelectTrigger className="bg-[#F3F4F6] border-none rounded-xl h-11 px-4 font-medium">
                      <SelectValue placeholder="Puskeswan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Puskeswan</SelectItem>
                      <SelectItem value="puskeswan-budong-budong">Budong-Budong</SelectItem>
                      <SelectItem value="puskeswan-karossa">Karossa</SelectItem>
                      <SelectItem value="puskeswan-pangale">Pangale</SelectItem>
                      <SelectItem value="puskeswan-tobadak">Tobadak</SelectItem>
                      <SelectItem value="puskeswan-topoyo">Topoyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-xl border border-border/50 overflow-hidden">
              <Table>
                <TableHeader className="bg-[#F8FAFC]">
                  <TableRow>
                    <TableHead className="font-bold text-[#064E3B]">Tanggal</TableHead>
                    <TableHead className="font-bold text-[#064E3B]">Petugas</TableHead>
                    <TableHead className="font-bold text-[#064E3B]">Puskeswan</TableHead>
                    <TableHead className="font-bold text-[#064E3B]">Peternak</TableHead>
                    <TableHead className="font-bold text-[#064E3B] text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}><TableCell colSpan={5}><Skeleton className="h-10 w-full" /></TableCell></TableRow>
                    ))
                  ) : filteredReports.map((report: any) => (
                    <TableRow key={report.id}>
                      <TableCell className="text-xs font-medium">{report.birthDate ? format(new Date(report.birthDate), 'dd MMM yyyy') : '-'}</TableCell>
                      <TableCell className="font-bold text-[#064E3B]">{report.officerName}</TableCell>
                      <TableCell className="text-xs font-semibold uppercase">{report.puskeswan?.replace('puskeswan-', '').replace('-', ' ')}</TableCell>
                      <TableCell className="text-sm font-medium">{report.farmerName}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(report.id, report.isMock)}><Trash2 className="size-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards (Accordion) */}
            <div className="md:hidden space-y-4">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-2xl" />
                ))
              ) : filteredReports.map((report: any) => (
                <Accordion key={report.id} type="single" collapsible className="w-full">
                  <AccordionItem value={report.id} className="border rounded-2xl bg-white px-4 py-2 shadow-sm border-slate-100">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex flex-col items-start text-left space-y-1 w-full">
                        <span className="text-lg font-bold text-slate-900 leading-tight">{report.officerName}</span>
                        <span className="text-sm font-medium text-slate-400 capitalize">
                          {report.puskeswan?.replace('puskeswan-', '').replace('-', ' ')}
                        </span>
                        <span className="text-sm text-slate-400 font-medium">
                          {report.birthDate ? format(new Date(report.birthDate), 'dd MMM yyyy') : '-'}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 border-t border-slate-50">
                      <div className="grid grid-cols-1 gap-4 text-sm mt-4">
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                          <User className="size-5 text-[#064E3B]" />
                          <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold">Peternak</span>
                            <span className="font-bold text-slate-800">{report.farmerName}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                          <MapPin className="size-5 text-[#064E3B]" />
                          <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold">Alamat</span>
                            <span className="font-medium text-slate-700">{report.farmerAddress || '-'}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-slate-50 rounded-xl">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Indukan</span>
                            <span className="font-bold text-slate-800">{report.damBreed || '-'}</span>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-xl">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Eartag</span>
                            <span className="font-bold text-slate-800">{report.damEartag || '-'}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                          <Badge variant="outline" className="rounded-lg border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                            {report.breedingType?.replace('-', ' ')}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDelete(report.id, report.isMock)}
                            className="text-destructive font-bold text-xs"
                          >
                            Hapus Laporan
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="statistik">
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 px-6">
              <div className="size-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                <BarChart3 className="size-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-xl text-slate-800">Visualisasi Data</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">Fitur statistik sedang dalam pengembangan untuk analisis performa peternakan.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
