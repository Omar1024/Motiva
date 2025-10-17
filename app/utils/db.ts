// IndexedDB utility for efficient favorites management
import { Category, Language } from '../types'

const DB_NAME = 'motiva-db'
const DB_VERSION = 1
const FAVORITES_STORE = 'favorites'
const RATINGS_STORE = 'ratings'

export interface FavoriteQuote {
  id: string
  text: string
  author: string
  category: Category
  language: Language
  favoritedAt: number
  timestamp?: number // For backward compatibility
}

export interface Rating {
  quoteId: string
  rating: number
}

class InspireMeDB {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create favorites store
        if (!db.objectStoreNames.contains(FAVORITES_STORE)) {
          const favStore = db.createObjectStore(FAVORITES_STORE, { keyPath: 'id' })
          favStore.createIndex('language', 'language', { unique: false })
          favStore.createIndex('category', 'category', { unique: false })
          favStore.createIndex('favoritedAt', 'favoritedAt', { unique: false })
        }

        // Create ratings store
        if (!db.objectStoreNames.contains(RATINGS_STORE)) {
          db.createObjectStore(RATINGS_STORE, { keyPath: 'quoteId' })
        }
      }
    })
  }

  // Favorites operations
  async addFavorite(favorite: FavoriteQuote): Promise<void> {
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([FAVORITES_STORE], 'readwrite')
      const store = transaction.objectStore(FAVORITES_STORE)
      const request = store.put(favorite)
      
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async removeFavorite(id: string): Promise<void> {
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([FAVORITES_STORE], 'readwrite')
      const store = transaction.objectStore(FAVORITES_STORE)
      const request = store.delete(id)
      
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async getFavorite(id: string): Promise<FavoriteQuote | null> {
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([FAVORITES_STORE], 'readonly')
      const store = transaction.objectStore(FAVORITES_STORE)
      const request = store.get(id)
      
      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  }

  async getAllFavorites(): Promise<FavoriteQuote[]> {
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([FAVORITES_STORE], 'readonly')
      const store = transaction.objectStore(FAVORITES_STORE)
      const request = store.getAll()
      
      request.onsuccess = () => resolve(request.result || [])
      request.onerror = () => reject(request.error)
    })
  }

  async getFavoritesByLanguage(language: Language): Promise<FavoriteQuote[]> {
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([FAVORITES_STORE], 'readonly')
      const store = transaction.objectStore(FAVORITES_STORE)
      const index = store.index('language')
      const request = index.getAll(language)
      
      request.onsuccess = () => resolve(request.result || [])
      request.onerror = () => reject(request.error)
    })
  }

  async clearAllFavorites(): Promise<void> {
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([FAVORITES_STORE], 'readwrite')
      const store = transaction.objectStore(FAVORITES_STORE)
      const request = store.clear()
      
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  // Ratings operations
  async setRating(quoteId: string, rating: number): Promise<void> {
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([RATINGS_STORE], 'readwrite')
      const store = transaction.objectStore(RATINGS_STORE)
      const request = store.put({ quoteId, rating })
      
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async getRating(quoteId: string): Promise<number> {
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([RATINGS_STORE], 'readonly')
      const store = transaction.objectStore(RATINGS_STORE)
      const request = store.get(quoteId)
      
      request.onsuccess = () => resolve(request.result?.rating || 0)
      request.onerror = () => reject(request.error)
    })
  }

  async getAllRatings(): Promise<Map<string, number>> {
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([RATINGS_STORE], 'readonly')
      const store = transaction.objectStore(RATINGS_STORE)
      const request = store.getAll()
      
      request.onsuccess = () => {
        const ratings = new Map<string, number>()
        request.result.forEach((item: Rating) => {
          ratings.set(item.quoteId, item.rating)
        })
        resolve(ratings)
      }
      request.onerror = () => reject(request.error)
    })
  }

  // Migration from localStorage (support both old "inspireme" and new "motiva" keys)
  async migrateFromLocalStorage(): Promise<void> {
    try {
      // Migrate favorites (try both old and new keys)
      const savedFavorites = localStorage.getItem('motiva-favorites') || localStorage.getItem('inspireme-favorites')
      if (savedFavorites) {
        const favArray = JSON.parse(savedFavorites) as FavoriteQuote[]
        for (const fav of favArray) {
          await this.addFavorite(fav)
        }
        localStorage.removeItem('inspireme-favorites')
        localStorage.removeItem('motiva-favorites')
      }

      // Migrate ratings (try both old and new keys)
      const savedRatings = localStorage.getItem('motiva-ratings') || localStorage.getItem('inspireme-ratings')
      if (savedRatings) {
        const ratingsArray = JSON.parse(savedRatings) as [string, number][]
        for (const [quoteId, rating] of ratingsArray) {
          await this.setRating(quoteId, rating)
        }
        localStorage.removeItem('inspireme-ratings')
        localStorage.removeItem('motiva-ratings')
      }
    } catch (error) {
      console.error('Migration error:', error)
    }
  }
}

// Singleton instance
export const db = new InspireMeDB()

