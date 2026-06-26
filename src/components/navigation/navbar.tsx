
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ClipboardList } from "lucide-react"

export function Navbar() {
  return (
    <Card className="border-none shadow-sm bg-white p-6 overflow-hidden mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="flex aspect-square size-12 items-center justify-center rounded-xl bg-[#FBBF24] text-black shadow-md transition-transform group-hover:scale-105">
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
        </Link>
        <Link href="/data-laporan">
          <Button variant="outline" className="rounded-xl border-[#064E3B] text-[#064E3B] hover:bg-[#064E3B] hover:text-white transition-all gap-2 px-6 font-bold shadow-sm">
            <ClipboardList className="size-5" />
            Data Lap.
          </Button>
        </Link>
      </div>
    </Card>
  )
}
