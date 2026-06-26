
"use client"

import { useState } from "react"
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
import { Search, BarChart3, Table as TableIcon, Undo2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DataLaporanPage() {
  const [view, setView] = useState<'tabel' | 'statistik'>('tabel')

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto pb-12 relative">
      {/* Header Grid Filters */}
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Puskeswan</Label>
              <Select>
                <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl h-11 px-4 focus:ring-1 focus:ring-primary/20">
                  <SelectValue placeholder="Semua Puskeswan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Puskeswan</SelectItem>
                  <SelectItem value="budong-budong">Puskeswan Budong-Budong</SelectItem>
                  <SelectItem value="karossa">Puskeswan Karossa</SelectItem>
                  <SelectItem value="pangale">Puskeswan Pangale</SelectItem>
                  <SelectItem value="tobadak">Puskeswan Tobadak</SelectItem>
                  <SelectItem value="topoyo">Puskeswan Topoyo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Petugas</Label>
              <Select disabled>
                <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl h-11 px-4 focus:ring-1 focus:ring-primary/20">
                  <SelectValue placeholder="Semua Petugas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Petugas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Bulan</Label>
              <Select>
                <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl h-11 px-4 focus:ring-1 focus:ring-primary/20">
                  <SelectValue placeholder="Semua Bulan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Bulan</SelectItem>
                  <SelectItem value="1">Januari</SelectItem>
                  <SelectItem value="2">Februari</SelectItem>
                  {/* ... other months */}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tahun</Label>
              <Select>
                <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl h-11 px-4 focus:ring-1 focus:ring-primary/20">
                  <SelectValue placeholder="Semua Tahun" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tahun</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <Input 
          placeholder="Cari peternak, alamat, atau petugas..."
          className="w-full md:max-w-md bg-white border-border/50 rounded-xl h-12 pl-12 pr-4 shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20"
        />
      </div>

      {/* View Toggle and Back Button Row */}
      <div className="flex items-center gap-4">
        {/* Back Button */}
        <Link href="/">
          <Button 
            variant="ghost" 
            size="icon" 
            className="size-12 rounded-full bg-[#064E3B] text-white hover:bg-[#064E3B]/90 shadow-lg"
          >
            <Undo2 className="size-6" />
          </Button>
        </Link>

        {/* Custom Toggle/Tabs */}
        <div className="flex-1 flex bg-[#F3F4F6] rounded-xl p-1 gap-1 shadow-inner">
          <Button 
            onClick={() => setView('tabel')}
            className={`flex-1 rounded-lg h-10 font-bold gap-2 transition-all ${
              view === 'tabel' 
                ? 'bg-[#FBBF24] text-black shadow-sm' 
                : 'bg-transparent text-muted-foreground hover:bg-black/5'
            }`}
          >
            <TableIcon className="size-4" />
            Tabel
          </Button>
          <Button 
            onClick={() => setView('statistik')}
            className={`flex-1 rounded-lg h-10 font-bold gap-2 transition-all ${
              view === 'statistik' 
                ? 'bg-[#FBBF24] text-black shadow-sm' 
                : 'bg-transparent text-muted-foreground hover:bg-black/5'
            }`}
          >
            <BarChart3 className="size-4" />
            Statistik
          </Button>
        </div>
      </div>

      {/* Content View */}
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden min-h-[400px]">
        <CardContent className="p-0">
          {view === 'tabel' ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#F8FAFC]">
                  <TableRow>
                    <TableHead className="font-bold">Tanggal</TableHead>
                    <TableHead className="font-bold">Peternak</TableHead>
                    <TableHead className="font-bold">Puskeswan</TableHead>
                    <TableHead className="font-bold">Petugas</TableHead>
                    <TableHead className="font-bold">Jenis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20 text-muted-foreground italic">
                      Belum ada data laporan yang tersedia.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <BarChart3 className="size-16 text-muted-foreground/20" />
              <p className="text-muted-foreground font-medium">Statistik sedang dalam pengembangan.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
