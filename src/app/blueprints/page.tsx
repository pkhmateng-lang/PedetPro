
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { generatePageBlueprint, type GeneratePageBlueprintOutput } from "@/ai/flows/generate-page-blueprint"
import { Zap, Loader2, Plus, Code, Layout as LayoutIcon, Box } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function BlueprintsPage() {
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [blueprint, setBlueprint] = useState<GeneratePageBlueprintOutput | null>(null)

  const handleGenerate = async () => {
    if (!description.trim()) return
    setLoading(true)
    try {
      const result = await generatePageBlueprint({ pageDescription: description })
      setBlueprint(result)
    } catch (error) {
      console.error("Blueprint generation failed", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold">Intelligent Blueprinting</h1>
        <p className="text-muted-foreground">Describe your page requirements, and let AI reason through the layout and components.</p>
      </div>

      <Card className="bg-card border-primary/20 shadow-lg">
        <CardContent className="pt-6 space-y-4">
          <Textarea 
            placeholder="e.g., A developer dashboard with a project statistics header, a list of active environments, and a quick actions sidebar..."
            className="min-h-[150px] bg-background border-border focus-visible:ring-primary text-base font-body"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleGenerate} 
              disabled={loading || !description.trim()}
              className="rounded-full px-6"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Reasoning...
                </>
              ) : (
                <>
                  <Zap className="mr-2 size-4" />
                  Generate Blueprint
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {blueprint && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-headline font-bold text-primary">{blueprint.pageTitle}</h2>
            <div className="flex gap-2">
              {blueprint.layout.map(l => (
                <Badge key={l} variant="secondary" className="font-code text-[10px] uppercase">{l}</Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blueprint.sections.map((section) => (
              <Card key={section.id} className="border-border">
                <CardHeader className="pb-3 border-b mb-4 flex-row items-center justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-headline flex items-center gap-2">
                      <LayoutIcon className="size-4 text-primary" />
                      {section.title}
                    </CardTitle>
                    <CardDescription className="text-xs font-code uppercase">ID: {section.id}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.components.map((comp, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-secondary/30 border border-border/50 group hover:border-accent/50 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Box className="size-4 text-accent" />
                        <h4 className="font-headline font-bold text-foreground">{comp.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {comp.description}
                      </p>
                      <div className="space-y-2">
                        <div className="text-[10px] font-code uppercase text-muted-foreground flex items-center gap-1">
                          <Code className="size-3" /> Expected Props
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {Object.entries(comp.props).map(([prop, type]) => (
                            <div key={prop} className="flex items-center justify-between text-xs p-2 rounded bg-background/50 border border-border/30">
                              <span className="font-code text-accent">{prop}</span>
                              <span className="text-muted-foreground italic">{type}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {section.components.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg border-border text-muted-foreground text-sm italic">
                      No components identified for this section.
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
