
"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
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
  User,
  Pencil,
  Save,
  Loader2
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter as DialogFooterUI,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore"
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
    officerName: "Anshari Saleh",
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
    puskeswan: "puskeswan-karossa",
    officerName: "Asri Rasyid",
    birthDate: "2026-01-25",
    offspringSex: "jantan",
    offspringCount: 1,
    breedingType: "kawin-alam",
    damBreed: "Bali",
    damEartag: "7601020055",
    isMock: true
  },
  {
    id: "mock-3",
    farmerName: "Siti Aminah",
    farmerAddress: "Pangale, Mateng",
    puskeswan: "puskeswan-pangale",
    officerName: "drh. Ketut Elok",
    birthDate: "2026-01-24",
    offspringSex: "jantan",
    offspringCount: 1,
    breedingType: "inseminasi-buatan",
    damBreed: "Limousin",
    damEartag: "7601030088",
    isMock: true
  }
]

export default function DataLaporanPage() {
  const db = useFirestore()
  const [isMounted, setIsMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPuskeswan, setFilterPuskeswan] = useState("all")
  
  // Edit State
  const [editingReport, setEditingReport] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const reportsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'reports'), orderBy('createdAt', 'desc'))
  }, [db])

  const { data: cloudReports, loading } = useCollection(reportsQuery)

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
    if (!confirm("Hapus laporan ini secara permanen dari Cloud?")) return;
    const docRef = doc(db, 'reports', reportId);
    deleteDoc(docRef).catch(async (err) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({ path: docRef.path, operation: 'delete' }));
    });
    toast({ title: "Data Dihapus", description: "Laporan telah dihapus dari Cloud Firestore." });
  }

  const handleEditClick = (report: any) => {
    if (report.isMock) {
      toast({ title: "Data Contoh", description: "Data contoh tidak dapat diedit." })
      return
    }
    setEditingReport({ ...report })
    setIsEditDialogOpen(true)
  }

  const handleUpdateReport = () => {
    if (!editingReport) return
    setIsSaving(true)
    const docRef = doc(db, 'reports', editingReport.id)
    
    const { id, ...dataToUpdate } = editingReport
    
    updateDoc(docRef, dataToUpdate)
      .then(() => {
        toast({ title: "Laporan Diperbarui", description: "Data berhasil disimpan ke cloud." })
        setIsEditDialogOpen(false)
        setEditingReport(null)
      })
      .catch(async (err) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ 
          path: docRef.path, 
          operation: 'update',
          requestResourceData: dataToUpdate
        }));
      })
      .finally(() => setIsSaving(false))
  }

  const updateEditField = (field: string, value: any) => {
    setEditingReport((prev: any) => ({ ...prev, [field]: value }))
  }

  if (!isMounted) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-6xl mx-auto pb-24 relative">
      <div className="fixed left-6 bottom-10 z-[60] flex flex-col items-center gap-2 md:hidden">
        <Link href="/">
          <Button variant="ghost" size="icon" className="size-14 rounded-full bg-[#064E3B] text-white shadow-xl border-2 border-white active:scale-95 transition-transform">
            <Undo2 className="size-7" />
          </Button>
        </Link>
      </div>

      <div className="px-4 md:px-0">
        <Tabs defaultValue="tabel" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#F1F5F9] rounded-2xl p-1.5 h-16 mb-8 shadow-inner">
            <TabsTrigger 
              value="tabel" 
              className="rounded-xl data-[state=active]:bg-[#FBBF24] data-[state=active]:text-black font-bold flex items-center gap-2 text-muted-foreground transition-all duration-300"
            >
              <LayoutGrid className="size-5" />
              Tabel
            </TabsTrigger>
            <TabsTrigger 
              value="statistik" 
              className="rounded-xl data-[state=active]:bg-[#FBBF24] data-[state=active]:text-black font-bold flex items-center gap-2 text-muted-foreground transition-all duration-300"
            >
              <BarChart3 className="size-5" />
              Statistik
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tabel" className="space-y-6 outline-none">
            {/* Header with Card Background - Now visible on all devices */}
            <Card className="border-none shadow-sm bg-white overflow-hidden mb-6">
              <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <h1 className="text-2xl md:text-3xl font-headline font-bold text-[#064E3B]">Arsip Laporan</h1>
                  <p className="text-sm text-muted-foreground font-medium">Monitoring data kelahiran ternak Mateng secara real-time.</p>
                </div>
                <Button className="w-full md:w-auto bg-[#064E3B] hover:bg-[#064E3B]/90 text-white rounded-xl gap-2 font-bold px-6 h-12 shadow-md transition-all active:scale-95">
                  <Download className="size-5" /> Ekspor Data
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white overflow-hidden mb-6 transition-all">
              <CardContent className="p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-[#064E3B] transition-colors" />
                    <Input 
                      placeholder="Cari Peternak atau Petugas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 pl-12 font-medium focus-visible:ring-2 focus-visible:ring-[#064E3B]/20 transition-all"
                    />
                  </div>
                  <Select value={filterPuskeswan} onValueChange={setFilterPuskeswan}>
                    <SelectTrigger className="bg-[#F3F4F6] border-none rounded-xl h-12 px-4 font-medium focus:ring-2 focus:ring-[#064E3B]/20 transition-all">
                      <SelectValue placeholder="Puskeswan" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-none shadow-xl">
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
            <div className="hidden md:block bg-white rounded-2xl border border-border/40 shadow-sm overflow-hidden">
              <Table className="table-fixed w-full">
                <TableHeader className="bg-[#F8FAFC]">
                  <TableRow className="hover:bg-transparent border-b">
                    <TableHead className="w-[150px] font-bold text-[#064E3B] py-5">Tanggal</TableHead>
                    <TableHead className="font-bold text-[#064E3B] py-5">Petugas</TableHead>
                    <TableHead className="w-[180px] font-bold text-[#064E3B] py-5">Puskeswan</TableHead>
                    <TableHead className="font-bold text-[#064E3B] py-5">Peternak</TableHead>
                    <TableHead className="w-[120px] font-bold text-[#064E3B] text-right py-5 pr-6">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i} className="animate-pulse">
                        <TableCell><Skeleton className="h-6 w-24 rounded-md" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-40 rounded-md" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-32 rounded-md" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-48 rounded-md" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto rounded-md" /></TableCell>
                      </TableRow>
                    ))
                  ) : filteredReports.map((report: any, index: number) => (
                    <TableRow 
                      key={report.id}
                      className="group animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both border-b last:border-0 hover:bg-[#F8FAFC]/50 transition-colors"
                      style={{ animationDelay: `${index * 40}ms` }}
                    >
                      <TableCell className="text-xs font-semibold text-slate-500">{report.birthDate ? format(new Date(report.birthDate), 'dd MMM yyyy') : '-'}</TableCell>
                      <TableCell className="font-bold text-[#064E3B]">{report.officerName}</TableCell>
                      <TableCell className="text-xs font-bold uppercase text-slate-400">{report.puskeswan?.replace('puskeswan-', '').replace('-', ' ')}</TableCell>
                      <TableCell className="text-sm font-semibold text-slate-700">{report.farmerName}</TableCell>
                      <TableCell className="text-right flex items-center justify-end gap-1 pr-4">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(report)} className="size-9 rounded-full hover:bg-white hover:shadow-sm transition-all"><Pencil className="size-4 text-[#064E3B]" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(report.id, report.isMock)} className="size-9 rounded-full hover:bg-white hover:shadow-sm transition-all"><Trash2 className="size-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-36 w-full rounded-2xl" />
                ))
              ) : filteredReports.map((report: any, index: number) => (
                <Accordion 
                  key={report.id} 
                  type="single" 
                  collapsible 
                  className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <AccordionItem value={report.id} className="border-none rounded-2xl bg-white px-5 py-2 shadow-sm border border-slate-100/50">
                    <AccordionTrigger className="hover:no-underline py-5 group">
                      <div className="flex flex-col items-start text-left space-y-1.5 w-full">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span className="text-xl font-bold text-slate-900 leading-tight group-data-[state=open]:text-[#064E3B] transition-colors">{report.officerName}</span>
                          <Badge variant="outline" className="rounded-lg border-slate-200 text-slate-400 uppercase text-[9px] font-bold h-5">
                            {report.isMock ? 'Contoh' : 'Cloud'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400 capitalize">
                          <MapPin className="size-3.5" />
                          {report.puskeswan?.replace('puskeswan-', '').replace('-', ' ')}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400 font-bold">
                          <Calendar className="size-3.5" />
                          {report.birthDate ? format(new Date(report.birthDate), 'dd MMM yyyy') : '-'}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6 border-t border-slate-50/80">
                      <div className="grid grid-cols-1 gap-5 text-sm mt-5">
                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl transition-colors hover:bg-slate-100/50">
                          <div className="size-10 rounded-full bg-[#FBBF24]/20 flex items-center justify-center text-[#064E3B]">
                             <User className="size-5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Pemilik Ternak</span>
                            <span className="font-bold text-slate-800 text-base">{report.farmerName}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-50 rounded-2xl flex flex-col space-y-1">
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Jenis Induk</span>
                            <span className="font-bold text-slate-800">{report.damBreed || '-'}</span>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-2xl flex flex-col space-y-1">
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">No. Eartag</span>
                            <span className="font-bold text-slate-800">{report.damEartag || '-'}</span>
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                          <div className="flex flex-col space-y-1">
                            <span className="text-[10px] text-slate-400 uppercase font-bold">Metode</span>
                            <span className="font-bold text-slate-800 capitalize">{report.breedingType?.replace('-', ' ')}</span>
                          </div>
                          <Badge className="bg-[#064E3B] text-white rounded-lg px-3 py-1 font-bold">
                            {report.offspringSex === 'jantan' ? '♂ Jantan' : '♀ Betina'}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                           <Button onClick={() => handleEditClick(report)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-[#064E3B] font-bold rounded-xl h-12 transition-all active:scale-95 shadow-none">
                             <Pencil className="size-4 mr-2" /> Edit
                           </Button>
                           <Button onClick={() => handleDelete(report.id, report.isMock)} className="flex-1 bg-red-50 hover:bg-red-100 text-destructive font-bold rounded-xl h-12 transition-all active:scale-95 shadow-none">
                             <Trash2 className="size-4 mr-2" /> Hapus
                           </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="statistik" className="outline-none">
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-5 px-6 animate-in zoom-in-95 duration-500">
              <div className="size-24 bg-[#FBBF24]/10 rounded-full flex items-center justify-center text-[#FBBF24] shadow-inner">
                <BarChart3 className="size-12" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-2xl text-[#064E3B]">Analisis Data Ternak</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                  Modul visualisasi data sedang dalam sinkronisasi. Fitur grafik populasi dan performa IB akan muncul secara otomatis di sini.
                </p>
              </div>
              <Button variant="outline" className="rounded-xl border-[#064E3B] text-[#064E3B] font-bold px-8 h-12 active:scale-95 transition-all">
                Cek Kesiapan Sistem
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl">
          <DialogHeader className="p-8 bg-[#064E3B] text-white rounded-t-3xl sticky top-0 z-10">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
               <div className="p-2 bg-white/20 rounded-xl">
                 <Pencil className="size-6" />
               </div>
               Edit Laporan Keseluruhan
            </DialogTitle>
            <p className="text-white/70 text-sm mt-1">Perbarui detail teknis laporan kelahiran ternak secara permanen.</p>
          </DialogHeader>
          
          <div className="p-8">
          {editingReport && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Nama Petugas Pelaksana</Label>
                  <input 
                    value={editingReport.officerName} 
                    onChange={(e) => updateEditField('officerName', e.target.value)} 
                    className="flex h-12 w-full rounded-xl bg-slate-50 px-4 text-sm font-medium border-none focus:ring-2 focus:ring-[#064E3B]/20 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Identitas Pemilik (Peternak)</Label>
                  <input 
                    value={editingReport.farmerName} 
                    onChange={(e) => updateEditField('farmerName', e.target.value)} 
                    className="flex h-12 w-full rounded-xl bg-slate-50 px-4 text-sm font-medium border-none focus:ring-2 focus:ring-[#064E3B]/20 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Domisili / Lokasi Ternak</Label>
                  <input 
                    value={editingReport.farmerAddress} 
                    onChange={(e) => updateEditField('farmerAddress', e.target.value)} 
                    className="flex h-12 w-full rounded-xl bg-slate-50 px-4 text-sm font-medium border-none focus:ring-2 focus:ring-[#064E3B]/20 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Wilayah Puskeswan</Label>
                  <Select value={editingReport.puskeswan} onValueChange={(v) => updateEditField('puskeswan', v)}>
                    <SelectTrigger className="bg-slate-50 border-none h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="puskeswan-budong-budong">Puskeswan Budong-Budong</SelectItem>
                      <SelectItem value="puskeswan-karossa">Puskeswan Karossa</SelectItem>
                      <SelectItem value="puskeswan-pangale">Puskeswan Pangale</SelectItem>
                      <SelectItem value="puskeswan-tobadak">Puskeswan Tobadak</SelectItem>
                      <SelectItem value="puskeswan-topoyo">Puskeswan Topoyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-slate-700">Ras Indukan</Label>
                    <input 
                      value={editingReport.damBreed} 
                      onChange={(e) => updateEditField('damBreed', e.target.value)} 
                      className="flex h-12 w-full rounded-xl bg-slate-50 px-4 text-sm font-medium border-none outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-slate-700">Nomor Eartag</Label>
                    <input 
                      value={editingReport.damEartag} 
                      onChange={(e) => updateEditField('damEartag', e.target.value)} 
                      className="flex h-12 w-full rounded-xl bg-slate-50 px-4 text-sm font-medium border-none outline-none" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-slate-700">Jns Kelamin Pedet</Label>
                    <Select value={editingReport.offspringSex} onValueChange={(v) => updateEditField('offspringSex', v)}>
                      <SelectTrigger className="bg-slate-50 border-none h-12 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="jantan">♂ Jantan</SelectItem>
                        <SelectItem value="betina">♀ Betina</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-slate-700">Kelahiran (Ekor)</Label>
                    <input 
                      type="number" 
                      value={editingReport.offspringCount} 
                      onChange={(e) => updateEditField('offspringCount', parseInt(e.target.value))} 
                      className="flex h-12 w-full rounded-xl bg-slate-50 px-4 text-sm font-medium border-none outline-none" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Metode Pembiakan</Label>
                  <Select value={editingReport.breedingType} onValueChange={(v) => updateEditField('breedingType', v)}>
                    <SelectTrigger className="bg-slate-50 border-none h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="kawin-alam">Kawin Alam</SelectItem>
                      <SelectItem value="inseminasi-buatan">Inseminasi Buatan (IB)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Estimasi Tgl Lahir</Label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input 
                      type="date" 
                      value={editingReport.birthDate} 
                      onChange={(e) => updateEditField('birthDate', e.target.value)} 
                      className="flex h-12 w-full rounded-xl bg-slate-50 pl-11 pr-4 text-sm font-medium border-none outline-none" 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>

          <DialogFooterUI className="p-8 bg-slate-50 rounded-b-3xl border-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)} className="w-full sm:w-auto rounded-xl h-12 px-6 font-bold text-slate-500 hover:bg-slate-100">Batalkan</Button>
            <Button onClick={handleUpdateReport} disabled={isSaving} className="w-full sm:w-auto bg-[#064E3B] hover:bg-[#064E3B]/90 text-white rounded-xl gap-2 px-10 h-12 font-bold shadow-lg transition-all active:scale-95">
              {isSaving ? <Loader2 className="animate-spin size-5" /> : <Save className="size-5" />}
              Simpan Perubahan
            </Button>
          </DialogFooterUI>
        </DialogContent>
      </Dialog>
    </div>
  )
}
