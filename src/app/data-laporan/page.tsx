
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
import { Search, Undo2, Download, MapPin, Calendar, Trash2, RefreshCw } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, doc, deleteDoc } from "firebase/firestore"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"
import { Skeleton } from "@/components/ui/skeleton"

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

  const { data: reports, loading, error } = useCollection(reportsQuery)

  const filteredReports = useMemo(() => {
    if (!reports) return []
    return reports.filter((r: any) => {
      const searchStr = ((r.farmerName || "") + (r.officerName || "") + (r.farmerAddress || "") + (r.damEartag || "")).toLowerCase()
      const matchSearch = searchStr.includes(searchQuery.toLowerCase())
      const matchPuskeswan = filterPuskeswan === "all" || r.puskeswan === filterPuskeswan
      return matchSearch && matchPuskeswan
    })
  }, [reports, searchQuery, filterPuskeswan])

  const handleDelete = (reportId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus laporan ini?")) return;

    const docRef = doc(db, 'reports', reportId);
    deleteDoc(docRef).catch(async (err) => {
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    });

    toast({
      title: "Laporan Dihapus",
      description: "Data telah dihapus dari database cloud.",
    });
  }

  if (!isMounted) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto pb-12 relative">
      <div className="fixed left-6 bottom-10 z-[60] flex flex-col items-center gap-2">
        <Link href="/">
          <Button 
            variant="ghost" 
            size="icon" 
            className="size-14 rounded-full bg-[#064E3B] text-white hover:bg-[#064E3B]/90 shadow-[0_10px_40px_-10px_rgba(6,78,59,0.5)] border-4 border-white transition-all hover:scale-110 active:scale-95"
          >
            <Undo2 className="size-8" />
          </Button>
        </Link>
        <span className="text-[10px] font-bold text-[#064E3B] bg-white/80 px-2 py-0.5 rounded-full shadow-sm uppercase tracking-tighter">Kembali</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-[#064E3B]">Arsip Pusat Laporan</h1>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <Button className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white font-bold rounded-xl gap-2 px-6">
            <Download className="size-5" />
            Ekspor
          </Button>
        </div>
      </div>

      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Filter Puskeswan</Label>
              <Select value={filterPuskeswan} onValueChange={setFilterPuskeswan}>
                <SelectContent>
                  <SelectItem value="all">Semua Puskeswan</SelectItem>
                  <SelectItem value="puskeswan-budong-budong">Budong-Budong</SelectItem>
                  <SelectItem value="puskeswan-karossa">Karossa</SelectItem>
                  <SelectItem value="puskeswan-pangale">Pangale</SelectItem>
                  <SelectItem value="puskeswan-tobadak">Tobadak</SelectItem>
                  <SelectItem value="puskeswan-topoyo">Topoyo</SelectItem>
                </SelectContent>
                <SelectTrigger className="bg-[#F3F4F6] border-none rounded-xl h-11 px-4 font-medium">
                  <SelectValue placeholder="Semua Puskeswan" />
                </SelectTrigger>
              </Select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Cari Peternak / Eartag / Petugas</Label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input 
                  placeholder="Ketik kata kunci pencarian..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F3F4F6] border-none rounded-xl h-11 pl-12 shadow-inner font-medium"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden min-h-[400px]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#F8FAFC]">
                <TableRow>
                  <TableHead className="font-bold text-[#064E3B] w-[150px]">Waktu Lahir</TableHead>
                  <TableHead className="font-bold text-[#064E3B]">Peternak & Alamat</TableHead>
                  <TableHead className="font-bold text-[#064E3B]">Puskeswan</TableHead>
                  <TableHead className="font-bold text-[#064E3B]">Petugas</TableHead>
                  <TableHead className="font-bold text-[#064E3B]">Anakan</TableHead>
                  <TableHead className="font-bold text-[#064E3B] w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48" />
                        </div>
                      </TableCell>
                      <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8 rounded-md" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredReports.length > 0 ? (
                  filteredReports.map((report: any) => (
                    <TableRow key={report.id} className="hover:bg-muted/50 transition-colors group">
                      <TableCell className="whitespace-nowrap font-medium text-muted-foreground text-xs">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-3.5 text-[#064E3B]" />
                          {report.birthDate ? format(new Date(report.birthDate), 'dd MMM yyyy') : '-'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#064E3B] text-sm">{report.farmerName}</span>
                          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-0.5">
                            <MapPin className="size-3 shrink-0" />
                            <span className="truncate max-w-[150px]">{report.farmerAddress || 'Alamat tidak ada'}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-[#F3F4F6] text-[#064E3B] text-[10px] uppercase font-bold border-none">
                          {report.puskeswan?.replace('puskeswan-', '').replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-semibold">{report.officerName}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-[10px] space-y-1">
                          <span className="font-bold uppercase text-[#064E3B]">{report.offspringSex || '-'}</span>
                          <span className="text-muted-foreground">{report.offspringCount || 1} ekor</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(report.id)}
                          className="size-8 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-32">
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 flex items-center gap-3 text-red-700 text-sm font-bold">
            <RefreshCw className="size-5 animate-spin" />
            Sedang mencoba menyambung ulang ke Cloud Store...
          </CardContent>
        </Card>
      )}
    </div>
  )
}
