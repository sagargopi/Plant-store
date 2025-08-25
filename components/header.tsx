import Link from "next/link"

export function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <h1 className="text-2xl font-bold text-foreground">Urvann</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Plants
            </Link>
            <Link href="/admin" className="text-foreground hover:text-primary transition-colors">
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
