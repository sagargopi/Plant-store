import { AdminPlantForm } from "@/components/admin-plant-form"
import { Header } from "@/components/header"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Add new plants to the catalog</p>
          </div>
          <AdminPlantForm />
        </div>
      </main>
    </div>
  )
}
