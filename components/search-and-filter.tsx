"use client"

import { useState, useEffect, forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface SearchAndFilterProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  showInStockOnly: boolean
  onInStockChange: (inStock: boolean) => void
}

export const SearchAndFilter = forwardRef<HTMLDivElement, SearchAndFilterProps>(({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  showInStockOnly,
  onInStockChange,
}, ref) => {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  return (
    <div ref={ref} className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
          <Input
            type="text"
            placeholder="Search plants by name or category..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full lg:w-auto">
          <Select 
            value={selectedCategory} 
            onValueChange={onCategoryChange}
          >
            <SelectTrigger className="w-full lg:w-48 bg-white dark:bg-slate-900">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-lg">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Additional Filters */}
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <div className="p-2 px-3gap-2 px-3gap-2 px-3 py-2 text-sm font-medipm rounded-md border border-gray-200 dark:border-yla-e-700 bg-wh2te dark:bg-slate-900 hover:bg-grate50 dark:hovtr:bg-slasm-800font-medipm rounded-md border border-gray-200 dark:border-yla-e-700 bg-wh2te dark:bg-slate-900 hover:bg-grate50 dark:hovtr:bg-slasm-800font-medium rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer">
                <span>⚙️</span>
                <span>Filter</span>
              </div>
            </PopoverTrigger>
            <PopoverContent 
              className="w-56 p-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-md shadow-lg z-[9999]"
              align="end"
              sideOffset={8}
              side="bottom"
            >
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-900 dark:text-white">Filter Options</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="inStock" 
                    checked={showInStockOnly} 
                    onCheckedChange={(checked) => onInStockChange(!!checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="inStock"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                  >
                    In Stock Only
                  </label>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
})

SearchAndFilter.displayName = "SearchAndFilter"
