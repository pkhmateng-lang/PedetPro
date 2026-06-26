"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ClipboardList, Users, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section wrapped in a Card */}
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

      {/* Quick Actions / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#064E3B]">Aktivitas Terbaru</CardTitle>
            <CardDescription>Pemutakhiran data oleh pendamping PKH</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/10 transition-colors border border-transparent hover:border-border">
                <div className="mt-1 bg-green-100 p-2 rounded-full">
                  <CheckCircle2 className="size-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Verifikasi KPM Selesai</p>
                  <p className="text-xs text-muted-foreground">Desa Topoyo • 2 jam yang lalu</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-[#064E3B] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Users size={120} />
          </div>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#FBBF24]">Tugas Mendesak</CardTitle>
            <CardDescription className="text-white/70">Perlu tindak lanjut segera</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-2 mb-2 text-[#FBBF24]">
                <AlertCircle className="size-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Validasi Gagal</span>
              </div>
              <p className="text-sm font-medium">12 NIK tidak ditemukan di database pusat. Mohon periksa kembali data lapangan.</p>
              <Button size="sm" className="mt-4 bg-[#FBBF24] text-black hover:bg-[#FBBF24]/90 rounded-full font-bold">
                Tinjau Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
