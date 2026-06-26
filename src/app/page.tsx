import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Zap, Box, Palette, LayoutTemplate } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      title: "Intelligent Blueprinting",
      description: "Generate initial page structures and component outlines using GenAI reasoning.",
      icon: Zap,
      href: "/blueprints",
      color: "text-primary"
    },
    {
      title: "Skeleton Library",
      description: "Access minimalistic, low-fidelity UI components for rapid placeholder scaffolding.",
      icon: Box,
      href: "/skeletons",
      color: "text-accent"
    },
    {
      title: "Theme Workbench",
      description: "Centralized dashboard to configure global CSS variables, colors, and typography.",
      icon: Palette,
      href: "/workbench",
      color: "text-indigo-400"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8">
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-widest">
          <LayoutTemplate className="size-3" />
          Ready for development
        </div>
        <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter leading-tight">
          Your Blank Canvas <br />
          <span className="text-primary">Defined by Logic.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Tabula provides a clean, high-contrast environment to reason through application architecture before committing to high-fidelity design.
        </p>
        <div className="flex gap-4 pt-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/blueprints">Start Blueprinting</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link href="/skeletons">Explore Skeletons</Link>
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="bg-card border-border hover:border-primary/50 transition-colors group">
            <CardHeader>
              <feature.icon className={`size-8 mb-4 ${feature.color}`} />
              <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm leading-relaxed">
                {feature.description}
              </CardDescription>
              <Button asChild variant="ghost" className="p-0 h-auto hover:bg-transparent text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform">
                <Link href={feature.href} className="inline-flex items-center gap-2">
                  Launch tool →
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="rounded-2xl border border-dashed border-border p-12 text-center bg-secondary/20">
        <h2 className="text-2xl font-headline font-bold mb-4">Responsive Base Shell</h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-8">
          The layout you're seeing now is the Tabula Base Shell—production-ready, accessible, and ready to be extended.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {['Sidebar Nav', 'Grid System', 'Dark Mode', 'Mobile Ready'].map((feature) => (
            <div key={feature} className="px-4 py-2 rounded-md bg-background border text-xs font-code">
              {feature}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
