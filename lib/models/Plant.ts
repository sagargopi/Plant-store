export interface Plant {
  _id?: string
  name: string
  price: number
  categories: string[]
  inStock: boolean
  description?: string
  image?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface PlantFilters {
  search?: string
  category?: string
  inStock?: boolean
}
