
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Palette, RefreshCw, Save, Code } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WorkbenchPage() {
  const [primaryColor, setPrimaryColor] = useState("#736CF5")
  const [accentColor, setAccentColor] = useState("#0D7FF2")
  const [borderRadius, setBorderRadius] = useState(8)

  const ColorPreview = ({ color, label }: { color: string, label: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
        <span className="text-[10px] font-code text-primary uppercase">{color}</span>
      </div>
      <div className="flex gap-3">
        <Input 
          type="color" 
          value={color} 
          onChange={(e) => label === "Primary" ? setPrimaryColor(e.target.value) : setAccentColor(e.target.value)}
          className="w-12 h-10 p-1 bg-transparent cursor-pointer rounded-md border-border"
        />
        <Input 
          type="text" 
          value={color}
          onChange={(e) => label === "Primary" ? setPrimaryColor(e.target.value) : setAccentColor(e.target.value)}
          className="flex-1 font-code text-sm uppercase"
        />
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold">Theme Workbench</h1>
          <p className="text-muted-foreground">Configure global design tokens and export your CSS configuration.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <RefreshCw className="mr-2 size-4" /> Reset
          </Button>
          <Button size="sm" className="rounded-full">
            <Save className="mr-2 size-4" /> Save Configuration
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-border bg-card/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="size-5 text-primary" />
              <CardTitle className="font-headline text-lg">Design Tokens</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <ColorPreview label="Primary" color={primaryColor} />
              <ColorPreview label="Accent" color={accentColor} />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Border Radius</Label>
                <span className="text-[10px] font-code text-primary">{borderRadius}px</span>
              </div>
              <Slider 
                value={[borderRadius]} 
                max={24} 
                step={2} 
                onValueChange={(val) => setBorderRadius(val[0])}
                className="py-4"
              />
            </div>
            
            <Separator />

            <div className="space-y-4">
               <Label className="text-xs uppercase tracking-wider text-muted-foreground">Typography Presets</Label>
               <div className="grid grid-cols-1 gap-2">
                 <Button variant="outline" className="justify-start text-xs font-headline" size="sm">Space Grotesk (Headline)</Button>
                 <Button variant="outline" className="justify-start text-xs font-body" size="sm">Inter (Body)</Button>
                 <Button variant="outline" className="justify-start text-xs font-code" size="sm">Source Code Pro (Data)</Button>
               </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-border overflow-hidden">
          <CardHeader className="bg-secondary/20 border-b">
            <CardTitle className="font-headline text-lg">Theme Preview</CardTitle>
            <CardDescription>Live visual representation of your workspace theme.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="visual" className="w-full">
              <div className="border-b px-6 py-2 bg-secondary/10">
                <TabsList className="bg-transparent border-0 gap-4">
                  <TabsTrigger value="visual" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-0 rounded-full text-xs">Visual Component</TabsTrigger>
                  <TabsTrigger value="code" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-0 rounded-full text-xs">CSS Variables</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="visual" className="p-8 m-0 space-y-8">
                <div className="space-y-4 p-8 rounded-xl border border-border bg-background" style={{ borderRadius: `${borderRadius}px` }}>
                   <h3 className="text-2xl font-headline font-bold" style={{ color: primaryColor }}>Branded Interface Header</h3>
                   <p className="text-sm text-muted-foreground leading-relaxed font-body">
                     This is a live preview of how your theme tokens impact real UI components. The header uses the <strong>Primary</strong> color and the <strong>Headline</strong> font.
                   </p>
                   <div className="flex gap-3 pt-4">
                     <Button style={{ backgroundColor: primaryColor, borderRadius: `${borderRadius}px` }} className="text-white border-0">Primary Action</Button>
                     <Button variant="outline" style={{ borderColor: accentColor, color: accentColor, borderRadius: `${borderRadius}px` }}>Secondary Cues</Button>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/20 border border-border" style={{ borderLeftWidth: '4px', borderLeftColor: primaryColor }}>
                    <span className="text-[10px] font-code block mb-1">Status: OK</span>
                    <p className="text-sm font-body">Information block with primary accentuation.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/20 border border-border" style={{ borderLeftWidth: '4px', borderLeftColor: accentColor }}>
                    <span className="text-[10px] font-code block mb-1">Status: NOTICE</span>
                    <p className="text-sm font-body">Highlight for secondary focus states.</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="p-0 m-0">
                <div className="bg-[#0e0e12] p-8 min-h-[400px]">
                  <div className="flex items-center gap-2 mb-4 text-xs font-code text-muted-foreground">
                    <Code className="size-4" /> :root variable export
                  </div>
                  <pre className="font-code text-sm text-primary leading-loose">
{`:root {
  --primary: ${primaryColor};
  --accent: ${accentColor};
  --radius: ${borderRadius}px;
  --font-headline: 'Space Grotesk';
  --font-body: 'Inter';
  --font-code: 'Source Code Pro';
}`}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
