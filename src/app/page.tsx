
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
import { ClipboardList, Calendar as CalendarIcon, Image as ImageIcon, Save, Plus } from "lucide-react"

export default function HomePage() {
  const [puskeswan, setPuskeswan] = useState<string>("")
  const [breedingType, setBreedingType] = useState<string>("kawin-alam")

  const budongBudongOfficers = [
    "Anshari Saleh",
    "Hadi",
    "Nur Fauzi",
    "Rahman",
    "Suprapto",
    "Tadi Sole",
    "Lainnya"
  ]

  const karossaOfficers = [
    "Asri Rasyid",
    "Basuki",
    "drh. Stephani",
    "Hasaruddin",
    "Nasaruddin",
    "Adiatman",
    "Surianca",
    "Lainnya"
  ]

  const pangaleOfficers = [
    "Andri",
    "drh. Ketut Elok",
    "Jarwo",
    "Jawaril",
    "Kamarudin",
    "Kamaruddin",
    "Mansyur",
    "Sugeng",
    "Lainnya"
  ]

  const tobadakOfficers = [
    "Aser M",
    "drh. Ishak",
    "Endang",
    "Feliks S",
    "Jupry",
    "Madalena",
    "Lainnya"
  ]

  const topoyoOfficers = [
    "Alfons B",
    "drh. Iqbal Djamil",
    "Fitriani",
    "Haslim",
    "Rizky A",
    "Lainnya"
  ]

  const getOfficerList = () => {
    if (puskeswan === "puskeswan-budong-budong") return budongBudongOfficers
    if (puskeswan === "puskeswan-karossa") return karossaOfficers
    if (puskeswan === "puskeswan-pangale") return pangaleOfficers
    if (puskeswan === "puskeswan-tobadak") return tobadakOfficers
    if (puskeswan === "puskeswan-topoyo") return topoyoOfficers
    return null
  }

  const currentOfficers = getOfficerList()

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
          <Link href="/data-laporan">
            <Button variant="outline" className="rounded-xl border-[#064E3B] text-[#064E3B] hover:bg-[#064E3B] hover:text-white transition-all gap-2 px-6 font-bold shadow-sm">
              <ClipboardList className="size-5" />
              Data Lap.
            </Button>
          </Link>
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
          <Select onValueChange={setPuskeswan}>
            <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus:ring-1 focus:ring-primary/20">
              <SelectValue placeholder="Pilih Puskeswan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="puskeswan-budong-budong">Puskeswan Budong-Budong</SelectItem>
              <SelectItem value="puskeswan-karossa">Puskeswan Karossa</SelectItem>
              <SelectItem value="puskeswan-pangale">Puskeswan Pangale</SelectItem>
              <SelectItem value="puskeswan-tobadak">Puskeswan Tobadak</SelectItem>
              <SelectItem value="puskeswan-topoyo">Puskeswan Topoyo</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Officer Input Card */}
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <Label className="text-sm font-bold text-foreground/80">Nama Petugas</Label>
          {currentOfficers ? (
            <Select>
              <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus:ring-1 focus:ring-primary/20">
                <SelectValue placeholder="Pilih Nama Petugas" />
              </SelectTrigger>
              <SelectContent>
                {currentOfficers.map((officer) => (
                  <SelectItem key={officer} value={officer.toLowerCase().replace(/\s+/g, '-')}>
                    {officer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input 
              placeholder="Isi Nama Petugas Manual"
              className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
            />
          )}
        </CardContent>
      </Card>

      {/* Farmer Details Cards Grouped */}
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-bold text-foreground/80">Nama Peternak</Label>
            <Input 
              placeholder="Isi Nama Peternak"
              className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
            />
          </div>
          <div className="space-y-4">
            <Label className="text-sm font-bold text-foreground/80">Identitas Peternak (KTP / No.Hp)</Label>
            <Input 
              placeholder="Isi KTP atau No. Hp"
              className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
            />
          </div>
          <div className="space-y-4">
            <Label className="text-sm font-bold text-foreground/80">Alamat Peternak</Label>
            <Input 
              placeholder="Isi Alamat Lengkap"
              className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Breeding Type Card */}
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <Label className="text-sm font-bold text-foreground/80">Jenis Perkawinan Ternak</Label>
          <Select value={breedingType} onValueChange={setBreedingType}>
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

      {/* Conditional Cards for Breeding Type */}
      <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
        {/* Indukan Section */}
        <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <Label className="text-sm font-bold text-foreground/80">Jenis Indukan</Label>
              <Input 
                placeholder="Isi Jenis Indukan"
                className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-sm font-bold text-foreground/80">No. Eartag Induk</Label>
              <Input 
                placeholder="Isi No. Eartag Induk"
                className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pejantan Section */}
        <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <Label className="text-sm font-bold text-foreground/80">Jenis Pejantan</Label>
              <Input 
                placeholder={breedingType === 'inseminasi-buatan' ? "Isi Jenis Pejantan atau Kode Straw" : "Isi Jenis Pejantan"}
                className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-sm font-bold text-foreground/80">No. Eartag Pejantan</Label>
              <Input 
                placeholder="Isi No. Eartag Pejantan"
                className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
            {breedingType === 'inseminasi-buatan' && (
              <>
                <div className="space-y-4">
                  <Label className="text-sm font-bold text-foreground/80">Id Straw Pejantan</Label>
                  <Input 
                    placeholder="Isi Id Straw Pejantan"
                    className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
                  />
                </div>
                <div className="space-y-4">
                  <Label className="text-sm font-bold text-foreground/80">Id Batch Straw</Label>
                  <Input 
                    placeholder="Isi Id Batch Straw"
                    className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
                  />
                </div>
                <div className="space-y-4">
                  <Label className="text-sm font-bold text-foreground/80">Produsen Straw</Label>
                  <Select>
                    <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus:ring-1 focus:ring-primary/20">
                      <SelectValue placeholder="Pilih Produsen Straw" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bib-lembang">BIB Lembang</SelectItem>
                      <SelectItem value="bib-singosari">BIB Singosari</SelectItem>
                      <SelectItem value="bib-pucak-maros">BIB Pucak Maros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Date Section */}
        <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <Label className="text-sm font-bold text-foreground/80">{breedingType === 'inseminasi-buatan' ? 'Tanggal IB (Inseminasi)' : 'Tanggal Perkawinan'}</Label>
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder={breedingType === 'inseminasi-buatan' ? "Pilih Tanggal IB" : "Pilih Tanggal Perkawinan"}
                  className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 pr-10 focus-visible:ring-1 focus-visible:ring-primary/20"
                />
                <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-sm font-bold text-foreground/80">Tanggal Lahir</Label>
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Pilih Tanggal Lahir"
                  className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 pr-10 focus-visible:ring-1 focus-visible:ring-primary/20"
                />
                <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Offspring Section */}
        <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <Label className="text-sm font-bold text-foreground/80">Jenis Kelamin Anakan</Label>
              <Select>
                <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus:ring-1 focus:ring-primary/20">
                  <SelectValue placeholder="Pilih Jenis Kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jantan">Jantan</SelectItem>
                  <SelectItem value="betina">Betina</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label className="text-sm font-bold text-foreground/80">Jumlah Anak</Label>
              <Input 
                type="number"
                placeholder="Isi Jumlah Anak"
                className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="ghost" size="icon" className="rounded-full bg-[#F3F4F6] text-[#064E3B] hover:bg-[#064E3B] hover:text-white transition-all shadow-sm">
                <Plus className="size-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

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
