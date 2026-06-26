
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Box, Code, MousePointer2 } from "lucide-react"

export default function SkeletonsPage() {
  const LowFiComponent = ({ label, children, description }: { label: string, children: React.ReactNode, description: string }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-headline font-bold uppercase tracking-widest text-primary">{label}</h3>
        <Badge variant="outline" className="font-code text-[10px]">Low-Fi</Badge>
      </div>
      <div className="p-6 border-2 border-dashed border-border rounded-xl bg-card/50 min-h-[120px] flex items-center justify-center transition-all hover:border-accent/50 group cursor-default">
        {children}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold">Skeleton Library</h1>
        <p className="text-muted-foreground">Minimalistic, low-fidelity components for structural validation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-8">
          <div className="flex items-center gap-2 border-b pb-2">
            <Box className="size-5 text-primary" />
            <h2 className="text-xl font-headline font-bold">Content Scaffolds</h2>
          </div>
          
          <LowFiComponent 
            label="Hero Section" 
            description="High-impact area for value propositions. Includes text alignment and primary call to action."
          >
            <div className="w-full space-y-4">
              <Skeleton className="h-10 w-3/4 mx-auto bg-muted/20" />
              <Skeleton className="h-4 w-1/2 mx-auto bg-muted/20" />
              <div className="flex justify-center gap-3">
                <Skeleton className="h-10 w-24 bg-primary/20" />
                <Skeleton className="h-10 w-24 bg-muted/20" />
              </div>
            </div>
          </LowFiComponent>

          <LowFiComponent 
            label="Feature Grid" 
            description="Repeated units for selling points or product categories."
          >
            <div className="grid grid-cols-3 gap-2 w-full">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-square w-full rounded-md bg-muted/20" />
                  <Skeleton className="h-2 w-full bg-muted/20" />
                </div>
              ))}
            </div>
          </LowFiComponent>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-2 border-b pb-2">
            <MousePointer2 className="size-5 text-accent" />
            <h2 className="text-xl font-headline font-bold">Interactive Blocks</h2>
          </div>

          <LowFiComponent 
            label="Form Shell" 
            description="Input groups with validation placeholders."
          >
            <div className="w-full space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="space-y-1">
                  <Skeleton className="h-3 w-16 bg-muted/30" />
                  <Skeleton className="h-8 w-full bg-muted/10" />
                </div>
              ))}
              <Skeleton className="h-9 w-full bg-primary/30" />
            </div>
          </LowFiComponent>

          <LowFiComponent 
            label="Data Table" 
            description="Tabular data with sorting and pagination controls."
          >
            <div className="w-full space-y-2">
              <div className="flex gap-2 mb-2">
                <Skeleton className="h-4 w-full bg-muted/40" />
                <Skeleton className="h-4 w-full bg-muted/40" />
                <Skeleton className="h-4 w-full bg-muted/40" />
              </div>
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-4 w-full bg-muted/10" />
              ))}
            </div>
          </LowFiComponent>
        </section>
      </div>

      <Card className="bg-secondary/10 border-border border-dashed">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code className="size-5 text-primary" />
            <CardTitle className="font-headline text-lg italic">The Philosophy of Low-Fi</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            By using these skeletons, you prevent premature optimization of colors and typography. 
            Focus on <strong>information hierarchy</strong> and <strong>user flow</strong> first.
            Once the logic is sound, use the Theme Workbench to inject brand identity.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
