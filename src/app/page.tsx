
"use client"

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
import { ClipboardList, Calendar as CalendarIcon, Image as ImageIcon, Save } from "lucide-react"

export default function HomePage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto pb-12">
      {/* Navigation Header Card */}
      <Card className="border-none shadow-sm bg-white p-6 overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex aspect-square size-12 items-center justify-center rounded-xl bg-[#FBBF24] text-black shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-layout-grid"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-headline font-bold text-[#064E3B]">PKH Mateng</h1>
          </div>
          <Button variant="outline" className="rounded-xl border-[#064E3B] text-[#064E3B] hover:bg-[#064E3B] hover:text-white transition-all gap-2 px-6 font-bold shadow-sm">
            <ClipboardList className="size-5" />
            Data Lap.
          </Button>
        </div>
      </Card>

      {/* Form Header Card */}
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-8 space-y-2">
          <h2 className="text-3xl font-headline font-bold text-[#064E3B]">Laporan Kelahiran</h2>
          <p className="text-muted-foreground font-medium">
            Input detail kelahiran ternak dan layanan reproduksi terpusat.
          </p>
        </CardContent>
      </Card>

      {/* Date Input Card */}
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <Label className="text-sm font-bold text-foreground/80">Tanggal Pelayanan Kelahiran</Label>
          <div className="relative">
            <Input 
              type="text" 
              defaultValue="06/26/2026"
              className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 pr-10 focus-visible:ring-1 focus-visible:ring-primary/20"
            />
            <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Puskeswan Input Card */}
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <Label className="text-sm font-bold text-foreground/80">Puskeswan</Label>
          <Select>
            <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus:ring-1 focus:ring-primary/20">
              <SelectValue placeholder="Pilih Puskeswan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budong-budong">Puskeswan Budong-Budong</SelectItem>
              <SelectItem value="karossa">Puskeswan Karossa</SelectItem>
              <SelectItem value="pangale">Puskeswan Pangale</SelectItem>
              <SelectItem value="tobadak">Puskeswan Tobadak</SelectItem>
              <SelectItem value="topoyo">Puskeswan Topoyo</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Officer Input Card */}
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <Label className="text-sm font-bold text-foreground/80">Nama Petugas</Label>
          <Input 
            placeholder="Isi Nama Petugas Manual"
            className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </CardContent>
      </Card>

      {/* Farmer Name Card */}
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <Label className="text-sm font-bold text-foreground/80">Nama Peternak</Label>
          <Input 
            placeholder="Isi Nama Peternak"
            className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </CardContent>
      </Card>

      {/* Farmer Identity Card */}
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <Label className="text-sm font-bold text-foreground/80">Identitas Peternak (KTP / No.Hp)</Label>
          <Input 
            placeholder="Isi KTP atau No. Hp"
            className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </CardContent>
      </Card>

      {/* Farmer Address Card */}
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <Label className="text-sm font-bold text-foreground/80">Alamat Peternak</Label>
          <Input 
            placeholder="Isi Alamat Lengkap"
            className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </CardContent>
      </Card>

      {/* Breeding Type Card */}
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <Label className="text-sm font-bold text-foreground/80">Jenis Perkawinan Ternak</Label>
          <Select defaultValue="kawin-alam">
            <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus:ring-1 focus:ring-primary/20">
              <SelectValue placeholder="Pilih Jenis Perkawinan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kawin-alam">Kawin Alam</SelectItem>
              <SelectItem value="inseminasi-buatan">Inseminasi Buatan</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Photo Documentation Card */}
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <Label className="text-sm font-bold text-foreground/80">Foto Dokumentasi Kelahiran</Label>
          <div className="border-2 border-dashed border-muted rounded-xl p-12 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#F3F4F6]/50 transition-colors">
            <ImageIcon className="size-10 text-muted-foreground/60" />
            <span className="text-sm text-muted-foreground font-medium">Pilih Foto (Maks 500kb)</span>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button className="w-full h-14 rounded-xl bg-[#064E3B] hover:bg-[#064E3B]/90 text-white font-bold text-lg gap-3 shadow-md transition-all active:scale-[0.98]">
        <Save className="size-6" />
        Simpan Data Laporan
      </Button>
    </div>
  )
}
