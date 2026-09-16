import { PRODUCTS, CATEGORIES, SUGGESTED_SEARCHES } from '../data/products'
import { STORES } from '../data/stores'

// Search products by text query
export async function searchByText(query = '', filters = {}) {
  await new Promise((res) => setTimeout(res, 220)) // Simulate network latency

  const normalized = query.trim().toLowerCase()
  let list = [...PRODUCTS]

  if (normalized) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(normalized) ||
        p.subtitle.toLowerCase().includes(normalized) ||
        p.category.toLowerCase().includes(normalized) ||
        p.materials.toLowerCase().includes(normalized) ||
        p.storeName.toLowerCase().includes(normalized)
    )
  }

  if (filters.category && filters.category !== 'All Items') {
    list = list.filter((p) => p.category === filters.category)
  }

  if (filters.matchType && filters.matchType !== 'ALL') {
    list = list.filter((p) => p.matchType === filters.matchType)
  }

  if (filters.maxDistanceKm) {
    const max = parseFloat(filters.maxDistanceKm)
    list = list.filter((p) => {
      const store = STORES.find((s) => s.id === p.storeId)
      return store ? store.distanceKm <= max : true
    })
  }

  return list
}

// Simulate AI visual garment scan
export async function searchByVisualScan(stepCallback = () => {}) {
  const steps = [
    { text: 'Frame captured. Isolating silhouette...', progress: 20 },
    { text: 'Analyzing textile texture & drape...', progress: 45 },
    { text: 'Extracting garment attributes: Noir pleat midi dress...', progress: 70 },
    { text: 'Querying boutique inventories within 5 km radius...', progress: 90 },
    { text: 'Found 4 localized matches nearby!', progress: 100 },
  ]

  for (const step of steps) {
    await new Promise((r) => setTimeout(r, 450))
    stepCallback(step)
  }

  // Return best matched products
  return PRODUCTS.slice(0, 4)
}

export function getSuggestedSearches() {
  return SUGGESTED_SEARCHES
}

export function getCategories() {
  return CATEGORIES
}

export function getAllProducts() {
  return PRODUCTS
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null
}

export function getAllStores() {
  return STORES
}

export function getStoreById(id) {
  return STORES.find((s) => s.id === id) || null
}
