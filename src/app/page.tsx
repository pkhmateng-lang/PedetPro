import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-4xl font-headline font-bold">Welcome to your new workspace</h1>
      <p className="text-muted-foreground max-w-md">
        This page has been cleared and is ready for your custom implementation.
      </p>
      <div className="flex gap-4">
        <Button asChild className="rounded-full">
          <Link href="/blueprints">Try AI Blueprints</Link>
        </Button>
      </div>
    </div>
  )
}
