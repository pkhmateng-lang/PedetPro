
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
import { Search, BarChart3, Table as TableIcon, Undo2, Download, Loader2, MapPin, Calendar, Database, AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy } from "firebase/firestore"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

export default function DataLaporanPage() {
  const db = useFirestore()
  const [view, setView] = useState<'tabel' | 'statistik'>('tabel')
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPuskeswan, setFilterPuskeswan] = useState("all")
  const [isMounted, setIsMounted] = useState(false)

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
    return reports.filter(r => {
      const searchStr = ((r.farmerName || "") + (r.officerName || "") + (r.farmerAddress || "") + (r.damEartag || "")).toLowerCase()
      const matchSearch = searchStr.includes(searchQuery.toLowerCase())
      const matchPuskeswan = filterPuskeswan === "all" || r.puskeswan === filterPuskeswan
      return matchSearch && matchPuskeswan
    })
  }, [reports, searchQuery, filterPuskeswan])

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
        <span className="text-[10px] font-bold text-[#064E3B] bg-white/80 px-2 py-0.5 rounded-full shadow-sm uppercase tracking-tighter">Tambah Laporan</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-[#064E3B]">Arsip Pusat Laporan</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Database className="size-4" />
            <span className="text-sm font-medium">
              Status Sistem: {isMounted && db ? "Sinkronisasi Cloud Aktif" : "Menghubungkan..."}
            </span>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <Badge variant="outline" className="h-10 px-4 border-[#064E3B] text-[#064E3B] bg-white font-bold">
            Total Database: {reports?.length || 0}
           </Badge>
           <Button className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white font-bold rounded-xl gap-2 flex-1 md:flex-none">
            <Download className="size-5" />
            Ekspor
          </Button>
        </div>
      </div>

      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Puskeswan</Label>
              <Select value={filterPuskeswan} onValueChange={setFilterPuskeswan}>
                <SelectContent>
                  <SelectItem value="all">Semua Puskeswan</SelectItem>
                  <SelectItem value="puskeswan-budong-budong">Budong-Budong</SelectItem>
                  <SelectItem value="puskeswan-karossa">Karossa</SelectItem>
                  <SelectItem value="puskeswan-pangale">Pangale</SelectItem>
                  <SelectItem value="puskeswan-tobadak">Tobadak</SelectItem>
                  <SelectItem value="puskeswan-topoyo">Topoyo</SelectItem>
                </SelectContent>
                <SelectTrigger className="bg-[#F3F4F6] border-none rounded-xl h-11 px-4">
                  <SelectValue placeholder="Semua Puskeswan" />
                </SelectTrigger>
              </Select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Cari Peternak/Eartag</Label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input 
                  placeholder="Ketik nama peternak atau nomor eartag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F3F4F6] border-none rounded-xl h-11 pl-12 shadow-inner"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex bg-[#F3F4F6] rounded-xl p-1 gap-1 shadow-inner">
        <Button onClick={() => setView('tabel')} className={`flex-1 rounded-lg h-10 font-bold gap-2 ${view === 'tabel' ? 'bg-[#FBBF24] text-black shadow-sm' : 'bg-transparent text-muted-foreground hover:bg-black/5'}`}><TableIcon className="size-4" /> Tabel Data</Button>
        <Button onClick={() => setView('statistik')} className={`flex-1 rounded-lg h-10 font-bold gap-2 ${view === 'statistik' ? 'bg-[#FBBF24] text-black shadow-sm' : 'bg-transparent text-muted-foreground hover:bg-black/5'}`}><BarChart3 className="size-4" /> Grafik</Button>
      </div>

      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden min-h-[400px]">
        <CardContent className="p-0">
          {view === 'tabel' ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#F8FAFC]">
                  <TableRow>
                    <TableHead className="font-bold text-[#064E3B]">Waktu Lahir</TableHead>
                    <TableHead className="font-bold text-[#064E3B]">Peternak & Alamat</TableHead>
                    <TableHead className="font-bold text-[#064E3B]">Asal Puskeswan</TableHead>
                    <TableHead className="font-bold text-[#064E3B]">Petugas Pelapor</TableHead>
                    <TableHead className="font-bold text-[#064E3B]">Spesifikasi Anakan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-20"><Loader2 className="animate-spin mx-auto text-primary" /></TableCell></TableRow>
                  ) : filteredReports.length > 0 ? (
                    filteredReports.map((report: any) => (
                      <TableRow key={report.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="whitespace-nowrap font-medium text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="size-3" />
                            {report.birthDate ? format(new Date(report.birthDate), 'dd MMM yyyy') : '-'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-bold text-[#064E3B]">{report.farmerName}</span>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="size-3 shrink-0" />
                              <span className="truncate max-w-[200px]">{report.farmerAddress || 'Alamat tidak diisi'}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#064E3B] capitalize">
                            {report.puskeswan?.replace('puskeswan-', '').replace('-', ' ')}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">{report.officerName}</TableCell>
                        <TableCell>
                          <div className="flex flex-col text-xs space-y-1">
                            <div className="flex gap-2">
                              <span className="text-muted-foreground">Jenis:</span>
                              <span className="font-bold capitalize">{report.offspringSex || '-'}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-muted-foreground">Jumlah:</span>
                              <span className="font-bold">{report.offspringCount || 1} ekor</span>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-20 text-muted-foreground italic">
                        Belum ada data laporan yang sinkron dengan Cloud.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <BarChart3 className="size-16 text-muted-foreground/20" />
              <p className="text-muted-foreground font-medium">Visualisasi data statistik otomatis dihasilkan dari database Cloud.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200 flex items-center gap-2">
          <AlertTriangle className="size-4" />
          Gagal memuat data: {error.message}. Pastikan Security Rules Firestore sudah diizinkan.
        </div>
      )}
    </div>
  )
}
