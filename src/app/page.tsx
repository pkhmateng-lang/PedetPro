
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Calendar as CalendarIcon, Save, Plus, Loader2 } from "lucide-react"
import { useFirestore } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"

export default function HomePage() {
  const router = useRouter()
  const db = useFirestore()
  const [loading, setLoading] = useState(false)
  
  // Form States
  const [formData, setFormData] = useState({
    serviceDate: new Date().toLocaleDateString('en-US'),
    puskeswan: "",
    officerName: "",
    farmerName: "",
    farmerId: "",
    farmerAddress: "",
    breedingType: "kawin-alam",
    damBreed: "",
    damEartag: "",
    sireBreed: "",
    sireEartag: "",
    strawId: "",
    batchId: "",
    strawProducer: "",
    matingDate: "",
    birthDate: "",
    offspringSex: "",
    offspringCount: 1,
  })

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (!formData.farmerName || !formData.puskeswan) {
      alert("Harap isi Nama Peternak dan Puskeswan.");
      return;
    }

    setLoading(true)
    const reportsRef = collection(db, 'reports')
    
    const payload = {
      ...formData,
      createdAt: serverTimestamp(),
    }

    addDoc(reportsRef, payload)
      .then(() => {
        router.push('/data-laporan')
      })
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: reportsRef.path,
          operation: 'write',
          requestResourceData: payload,
        });
        errorEmitter.emit('permission-error', permissionError);
        setLoading(false)
      })
  }

  const budongBudongOfficers = ["Anshari Saleh", "Hadi", "Nur Fauzi", "Rahman", "Suprapto", "Tadi Saleh", "Lainnya"]
  const karossaOfficers = ["Asri Rasyid", "Basuki", "drh. Stephani", "Hasaruddin", "Nasaruddin", "Adiatman", "Surianca", "Lainnya"]
  const pangaleOfficers = ["Andri", "drh. Ketut Elok", "Jarwo", "Jawaril", "Kamarudin", "Kamaruddin", "Mansyur", "Sugeng", "Lainnya"]
  const tobadakOfficers = ["Aser M", "drh. Ishak", "Endang", "Feliks S", "Jupry", "Madalena", "Lainnya"]
  const topoyoOfficers = ["Alfons B", "drh. Iqbal Djamil", "Fitriani", "Haslim", "Rizky A", "Lainnya"]

  const getOfficerList = () => {
    if (formData.puskeswan === "puskeswan-budong-budong") return budongBudongOfficers
    if (formData.puskeswan === "puskeswan-karossa") return karossaOfficers
    if (formData.puskeswan === "puskeswan-pangale") return pangaleOfficers
    if (formData.puskeswan === "puskeswan-tobadak") return tobadakOfficers
    if (formData.puskeswan === "puskeswan-topoyo") return topoyoOfficers
    return null
  }

  const currentOfficers = getOfficerList()

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto pb-12">
      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-8 space-y-2">
          <h2 className="text-3xl font-headline font-bold text-[#064E3B]">Laporan Kelahiran</h2>
          <p className="text-muted-foreground font-medium">Input detail kelahiran ternak dan layanan reproduksi terpusat.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <Label className="text-sm font-bold text-foreground/80">Tanggal Pelayanan Kelahiran</Label>
            <div className="relative">
              <Input 
                value={formData.serviceDate}
                onChange={(e) => updateField('serviceDate', e.target.value)}
                className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4 focus:ring-1 focus:ring-primary/20"
              />
              <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <Label className="text-sm font-bold text-foreground/80">Puskeswan</Label>
            <Select onValueChange={(v) => updateField('puskeswan', v)}>
              <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4">
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
      </div>

      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <Label className="text-sm font-bold text-foreground/80">Nama Petugas</Label>
          {currentOfficers ? (
            <Select onValueChange={(v) => updateField('officerName', v)}>
              <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4">
                <SelectValue placeholder="Pilih Nama Petugas" />
              </SelectTrigger>
              <SelectContent>
                {currentOfficers.map((officer) => (
                  <SelectItem key={officer} value={officer}>{officer}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input 
              placeholder="Isi Nama Petugas Manual"
              value={formData.officerName}
              onChange={(e) => updateField('officerName', e.target.value)}
              className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4"
            />
          )}
        </CardContent>
      </Card>

      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-foreground/80">Nama Peternak</Label>
              <Input placeholder="Isi Nama Peternak" value={formData.farmerName} onChange={(e) => updateField('farmerName', e.target.value)} className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-bold text-foreground/80">KTP / No.Hp</Label>
              <Input placeholder="Isi KTP atau No. Hp" value={formData.farmerId} onChange={(e) => updateField('farmerId', e.target.value)} className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-bold text-foreground/80">Alamat Peternak</Label>
            <Input placeholder="Isi Alamat Lengkap" value={formData.farmerAddress} onChange={(e) => updateField('farmerAddress', e.target.value)} className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <Label className="text-sm font-bold text-foreground/80">Jenis Perkawinan Ternak</Label>
          <Select value={formData.breedingType} onValueChange={(v) => updateField('breedingType', v)}>
            <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl h-12 px-4">
              <SelectValue placeholder="Pilih Jenis Perkawinan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kawin-alam">Kawin Alam</SelectItem>
              <SelectItem value="inseminasi-buatan">Inseminasi Buatan</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bold">Jenis Indukan</Label>
                <Input placeholder="Isi Jenis Indukan" value={formData.damBreed} onChange={(e) => updateField('damBreed', e.target.value)} className="bg-[#F3F4F6] border-none rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">No. Eartag Induk</Label>
                <Input placeholder="Isi No. Eartag Induk" value={formData.damEartag} onChange={(e) => updateField('damEartag', e.target.value)} className="bg-[#F3F4F6] border-none rounded-xl h-12" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bold">Jenis Pejantan</Label>
                <Input placeholder="Isi Jenis Pejantan" value={formData.sireBreed} onChange={(e) => updateField('sireBreed', e.target.value)} className="bg-[#F3F4F6] border-none rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">No. Eartag Pejantan</Label>
                <Input placeholder="Isi No. Eartag Pejantan" value={formData.sireEartag} onChange={(e) => updateField('sireEartag', e.target.value)} className="bg-[#F3F4F6] border-none rounded-xl h-12" />
              </div>
            </div>

            {formData.breedingType === 'inseminasi-buatan' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-dashed">
                <div className="space-y-2">
                  <Label className="font-bold">Id Straw Pejantan</Label>
                  <Input placeholder="Id Straw" value={formData.strawId} onChange={(e) => updateField('strawId', e.target.value)} className="bg-[#F3F4F6] border-none rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Id Batch Straw</Label>
                  <Input placeholder="Id Batch" value={formData.batchId} onChange={(e) => updateField('batchId', e.target.value)} className="bg-[#F3F4F6] border-none rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Produsen Straw</Label>
                  <Select onValueChange={(v) => updateField('strawProducer', v)}>
                    <SelectTrigger className="bg-[#F3F4F6] border-none rounded-xl h-12">
                      <SelectValue placeholder="Pilih Produsen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bib-lembang">BIB Lembang</SelectItem>
                      <SelectItem value="bib-singosari">BIB Singosari</SelectItem>
                      <SelectItem value="bib-pucak-maros">BIB Pucak Maros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bold">{formData.breedingType === 'inseminasi-buatan' ? 'Tanggal IB' : 'Tanggal Perkawinan'}</Label>
                <Input placeholder="YYYY-MM-DD" value={formData.matingDate} onChange={(e) => updateField('matingDate', e.target.value)} className="bg-[#F3F4F6] border-none rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Tanggal Lahir</Label>
                <Input placeholder="YYYY-MM-DD" value={formData.birthDate} onChange={(e) => updateField('birthDate', e.target.value)} className="bg-[#F3F4F6] border-none rounded-xl h-12" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-sm bg-white overflow-hidden relative">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-12">
              <div className="space-y-2">
                <Label className="font-bold">Jenis Kelamin Anakan</Label>
                <Select onValueChange={(v) => updateField('offspringSex', v)}>
                  <SelectTrigger className="bg-[#F3F4F6] border-none rounded-xl h-12">
                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jantan">Jantan</SelectItem>
                    <SelectItem value="betina">Betina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Jumlah Anak</Label>
                <Input type="number" value={formData.offspringCount} onChange={(e) => updateField('offspringCount', parseInt(e.target.value))} className="bg-[#F3F4F6] border-none rounded-xl h-12" />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="absolute bottom-6 right-6 rounded-full bg-[#F3F4F6] text-[#064E3B] hover:bg-[#064E3B] hover:text-white transition-all">
              <Plus className="size-5" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          disabled={loading}
          onClick={handleSave}
          className="h-12 px-8 rounded-xl bg-[#064E3B] hover:bg-[#064E3B]/90 text-white font-bold gap-3 shadow-md transition-all active:scale-[0.98]"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save className="size-5" />}
          Simpan Data Laporan
        </Button>
      </div>
    </div>
  )
}
