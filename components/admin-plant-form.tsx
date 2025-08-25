"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FormData {
  name: string
  price: string
  categories: string[]
  inStock: boolean
  description: string
}

interface FormErrors {
  name?: string
  price?: string
  categories?: string
  general?: string
}

export function AdminPlantForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    categories: [],
    inStock: true,
    description: "",
  })

  const [categoryInput, setCategoryInput] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Plant name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Plant name must be at least 2 characters"
    }

    // Validate price
    if (!formData.price.trim()) {
      newErrors.price = "Price is required"
    } else {
      const price = Number.parseFloat(formData.price)
      if (Number.isNaN(price) || price <= 0) {
        newErrors.price = "Price must be a valid positive number"
      }
    }

    // Validate categories
    if (formData.categories.length === 0) {
      newErrors.categories = "At least one category is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddCategory = () => {
    const category = categoryInput.trim()
    if (category && !formData.categories.includes(category)) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, category],
      }))
      setCategoryInput("")
      // Clear category error if it exists
      if (errors.categories) {
        setErrors((prev) => ({ ...prev, categories: undefined }))
      }
    }
  }

  const handleRemoveCategory = (categoryToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat !== categoryToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddCategory()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitSuccess(false)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch("/api/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          price: Number.parseFloat(formData.price),
          categories: formData.categories,
          inStock: formData.inStock,
          description: formData.description.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add plant")
      }

      // Reset form on success
      setFormData({
        name: "",
        price: "",
        categories: [],
        inStock: true,
        description: "",
      })
      setSubmitSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error("Error adding plant:", error)
      setErrors({ general: "Failed to add plant. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Add New Plant</CardTitle>
      </CardHeader>
      <CardContent>
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 font-medium">Plant added successfully!</p>
          </div>
        )}

        {errors.general && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-destructive font-medium">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plant Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-card-foreground">
              Plant Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Money Plant"
              className={`bg-input border-border ${errors.name ? "border-destructive" : ""}`}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-card-foreground">
              Price (₹) *
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              placeholder="e.g., 299"
              className={`bg-input border-border ${errors.price ? "border-destructive" : ""}`}
            />
            {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <Label htmlFor="categories" className="text-card-foreground">
              Categories *
            </Label>
            <div className="flex gap-2">
              <Input
                id="categories"
                type="text"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., Indoor, Air Purifying"
                className="bg-input border-border flex-1"
              />
              <Button type="button" onClick={handleAddCategory} variant="outline" size="icon">
                <span className="text-lg">+</span>
              </Button>
            </div>

            {/* Display added categories */}
            {formData.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(category)}
                      className="ml-1 hover:text-destructive"
                    >
                      <span className="text-sm">×</span>
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {errors.categories && <p className="text-sm text-destructive">{errors.categories}</p>}
            <p className="text-sm text-muted-foreground">
              Type a category and press Enter or click + to add. You can add multiple categories.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-card-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the plant..."
              rows={3}
              className="bg-input border-border"
            />
          </div>

          {/* Stock Availability */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={formData.inStock}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, inStock: checked === true }))}
            />
            <Label htmlFor="inStock" className="text-card-foreground">
              In Stock
            </Label>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground">
            {isSubmitting ? (
              <>
                <span className="mr-2 inline-block animate-spin">⟳</span>
                Adding Plant...
              </>
            ) : (
              "Add Plant"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
