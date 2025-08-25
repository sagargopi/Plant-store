import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Plant } from "@/lib/models/Plant"

interface PlantCardProps {
  plant: Plant
}

export function PlantCard({ plant }: PlantCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={plant.image || "/placeholder.svg"}
            alt={plant.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/placeholder.svg";
            }}
          />
          <div className="absolute top-3 right-3">
            {plant.inStock ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                In Stock
              </Badge>
            ) : (
              <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg text-card-foreground mb-2 line-clamp-1">{plant.name}</h3>

          <p className="text-2xl font-bold text-primary mb-3">₹{plant.price}</p>

          {plant.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{plant.description}</p>}

          <div className="flex flex-wrap gap-1 mb-4">
            {plant.categories.slice(0, 3).map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="text-xs bg-accent/10 text-accent-foreground border-accent/20"
              >
                {category}
              </Badge>
            ))}
            {plant.categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{plant.categories.length - 3}
              </Badge>
            )}
          </div>

          <button
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              plant.inStock
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            disabled={!plant.inStock}
          >
            {plant.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
