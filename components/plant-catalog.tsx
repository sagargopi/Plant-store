"use client"

import { useState, useEffect } from "react"
import { PlantCard } from "./plant-card"
import { SearchAndFilter } from "./search-and-filter"
import type { Plant } from "@/lib/models/Plant"

export function PlantCatalog() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showInStockOnly, setShowInStockOnly] = useState(false)

  useEffect(() => {
    fetchPlants()
  }, [searchTerm, selectedCategory, showInStockOnly])

  const fetchPlants = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (searchTerm) params.append("search", searchTerm)
      if (selectedCategory !== "all") params.append("category", selectedCategory)
      if (showInStockOnly) params.append("inStock", "true")

      const response = await fetch(`/api/plants?${params}`)
      if (!response.ok) throw new Error("Failed to fetch plants")

      const data = await response.json()
      setPlants(data.plants)
      setError(null)
    } catch (err) {
      setError("Failed to load plants. Please try again.")
      console.error("Error fetching plants:", err)
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-destructive font-medium">{error}</p>
          <button
            onClick={fetchPlants}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Discover Beautiful Plants</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transform your space with our carefully curated collection of indoor and outdoor plants. From air-purifying
          varieties to stunning succulents, find the perfect green companion for your home.
        </p>
      </div>

      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        showInStockOnly={showInStockOnly}
        onInStockChange={setShowInStockOnly}
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg border border-border p-4 animate-pulse">
              <div className="bg-muted h-48 rounded-md mb-4"></div>
              <div className="bg-muted h-4 rounded mb-2"></div>
              <div className="bg-muted h-4 rounded w-2/3 mb-2"></div>
              <div className="bg-muted h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : plants.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-muted/50 rounded-lg p-8 max-w-md mx-auto">
            <p className="text-muted-foreground text-lg">No plants found matching your criteria.</p>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {plants.length} plant{plants.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {plants.map((plant) => (
              <PlantCard key={plant._id} plant={plant} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
