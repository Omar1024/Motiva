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
  private isIndexedDBSupported = true

  async init(): Promise<void> {
    // Check if IndexedDB is supported
    if (!window.indexedDB) {
      console.warn('IndexedDB is not supported, using fallback')
      this.isIndexedDBSupported = false
      return
    }

    return new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open(DB_NAME, DB_VERSION)

        request.onerror = () => {
          console.error('IndexedDB error:', request.error)
          this.isIndexedDBSupported = false
          resolve() // Don't reject, use fallback
        }
        
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
      } catch (error) {
        console.error('IndexedDB initialization failed:', error)
        this.isIndexedDBSupported = false
        resolve() // Don't reject, use fallback
      }
    })
  }

  // localStorage fallback methods
  private saveFavoritesToLocalStorage(favorites: FavoriteQuote[]): void {
    try {
      localStorage.setItem('motiva-favorites', JSON.stringify(favorites))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }

  private getFavoritesFromLocalStorage(): FavoriteQuote[] {
    try {
      const saved = localStorage.getItem('motiva-favorites')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
      return []
    }
  }

  private saveRatingsToLocalStorage(ratings: Map<string, number>): void {
    try {
      localStorage.setItem('motiva-ratings', JSON.stringify(Array.from(ratings.entries())))
    } catch (error) {
      console.error('Failed to save ratings to localStorage:', error)
    }
  }

  private getRatingsFromLocalStorage(): Map<string, number> {
    try {
      const saved = localStorage.getItem('motiva-ratings')
      return saved ? new Map(JSON.parse(saved)) : new Map()
    } catch (error) {
      console.error('Failed to load ratings from localStorage:', error)
      return new Map()
    }
  }

  // Favorites operations
  async addFavorite(favorite: FavoriteQuote): Promise<void> {
    if (!this.isIndexedDBSupported || !this.db) {
      // Use localStorage fallback
      const favorites = this.getFavoritesFromLocalStorage()
      const index = favorites.findIndex(f => f.id === favorite.id)
      if (index >= 0) {
        favorites[index] = favorite
      } else {
        favorites.push(favorite)
      }
      this.saveFavoritesToLocalStorage(favorites)
      return Promise.resolve()
    }

    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db!.transaction([FAVORITES_STORE], 'readwrite')
        const store = transaction.objectStore(FAVORITES_STORE)
        const request = store.put(favorite)
        
        request.onsuccess = () => resolve()
        request.onerror = () => {
          // Fallback to localStorage
          const favorites = this.getFavoritesFromLocalStorage()
          favorites.push(favorite)
          this.saveFavoritesToLocalStorage(favorites)
          resolve()
        }
      } catch (error) {
        // Fallback to localStorage
        const favorites = this.getFavoritesFromLocalStorage()
        favorites.push(favorite)
        this.saveFavoritesToLocalStorage(favorites)
        resolve()
      }
    })
  }

  async removeFavorite(id: string): Promise<void> {
    if (!this.isIndexedDBSupported || !this.db) {
      // Use localStorage fallback
      const favorites = this.getFavoritesFromLocalStorage()
      const filtered = favorites.filter(f => f.id !== id)
      this.saveFavoritesToLocalStorage(filtered)
      return Promise.resolve()
    }

    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db!.transaction([FAVORITES_STORE], 'readwrite')
        const store = transaction.objectStore(FAVORITES_STORE)
        const request = store.delete(id)
        
        request.onsuccess = () => resolve()
        request.onerror = () => {
          // Fallback to localStorage
          const favorites = this.getFavoritesFromLocalStorage()
          const filtered = favorites.filter(f => f.id !== id)
          this.saveFavoritesToLocalStorage(filtered)
          resolve()
        }
      } catch (error) {
        // Fallback to localStorage
        const favorites = this.getFavoritesFromLocalStorage()
        const filtered = favorites.filter(f => f.id !== id)
        this.saveFavoritesToLocalStorage(filtered)
        resolve()
      }
    })
  }

  async getFavorite(id: string): Promise<FavoriteQuote | null> {
    if (!this.isIndexedDBSupported || !this.db) {
      // Use localStorage fallback
      const favorites = this.getFavoritesFromLocalStorage()
      return Promise.resolve(favorites.find(f => f.id === id) || null)
    }

    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db!.transaction([FAVORITES_STORE], 'readonly')
        const store = transaction.objectStore(FAVORITES_STORE)
        const request = store.get(id)
        
        request.onsuccess = () => resolve(request.result || null)
        request.onerror = () => {
          // Fallback to localStorage
          const favorites = this.getFavoritesFromLocalStorage()
          resolve(favorites.find(f => f.id === id) || null)
        }
      } catch (error) {
        // Fallback to localStorage
        const favorites = this.getFavoritesFromLocalStorage()
        resolve(favorites.find(f => f.id === id) || null)
      }
    })
  }

  async getAllFavorites(): Promise<FavoriteQuote[]> {
    if (!this.isIndexedDBSupported || !this.db) {
      // Use localStorage fallback
      return Promise.resolve(this.getFavoritesFromLocalStorage())
    }

    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db!.transaction([FAVORITES_STORE], 'readonly')
        const store = transaction.objectStore(FAVORITES_STORE)
        const request = store.getAll()
        
        request.onsuccess = () => resolve(request.result || [])
        request.onerror = () => {
          // Fallback to localStorage
          resolve(this.getFavoritesFromLocalStorage())
        }
      } catch (error) {
        // Fallback to localStorage
        resolve(this.getFavoritesFromLocalStorage())
      }
    })
  }

  async getFavoritesByLanguage(language: Language): Promise<FavoriteQuote[]> {
    if (!this.isIndexedDBSupported || !this.db) {
      // Use localStorage fallback
      const favorites = this.getFavoritesFromLocalStorage()
      return Promise.resolve(favorites.filter(f => f.language === language))
    }

    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db!.transaction([FAVORITES_STORE], 'readonly')
        const store = transaction.objectStore(FAVORITES_STORE)
        const index = store.index('language')
        const request = index.getAll(language)
        
        request.onsuccess = () => resolve(request.result || [])
        request.onerror = () => {
          // Fallback to localStorage
          const favorites = this.getFavoritesFromLocalStorage()
          resolve(favorites.filter(f => f.language === language))
        }
      } catch (error) {
        // Fallback to localStorage
        const favorites = this.getFavoritesFromLocalStorage()
        resolve(favorites.filter(f => f.language === language))
      }
    })
  }

  async clearAllFavorites(): Promise<void> {
    if (!this.isIndexedDBSupported || !this.db) {
      // Use localStorage fallback
      this.saveFavoritesToLocalStorage([])
      return Promise.resolve()
    }

    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db!.transaction([FAVORITES_STORE], 'readwrite')
        const store = transaction.objectStore(FAVORITES_STORE)
        const request = store.clear()
        
        request.onsuccess = () => resolve()
        request.onerror = () => {
          // Fallback to localStorage
          this.saveFavoritesToLocalStorage([])
          resolve()
        }
      } catch (error) {
        // Fallback to localStorage
        this.saveFavoritesToLocalStorage([])
        resolve()
      }
    })
  }

  // Ratings operations
  async setRating(quoteId: string, rating: number): Promise<void> {
    if (!this.isIndexedDBSupported || !this.db) {
      // Use localStorage fallback
      const ratings = this.getRatingsFromLocalStorage()
      ratings.set(quoteId, rating)
      this.saveRatingsToLocalStorage(ratings)
      return Promise.resolve()
    }

    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db!.transaction([RATINGS_STORE], 'readwrite')
        const store = transaction.objectStore(RATINGS_STORE)
        const request = store.put({ quoteId, rating })
        
        request.onsuccess = () => resolve()
        request.onerror = () => {
          // Fallback to localStorage
          const ratings = this.getRatingsFromLocalStorage()
          ratings.set(quoteId, rating)
          this.saveRatingsToLocalStorage(ratings)
          resolve()
        }
      } catch (error) {
        // Fallback to localStorage
        const ratings = this.getRatingsFromLocalStorage()
        ratings.set(quoteId, rating)
        this.saveRatingsToLocalStorage(ratings)
        resolve()
      }
    })
  }

  async getRating(quoteId: string): Promise<number> {
    if (!this.isIndexedDBSupported || !this.db) {
      // Use localStorage fallback
      const ratings = this.getRatingsFromLocalStorage()
      return Promise.resolve(ratings.get(quoteId) || 0)
    }

    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db!.transaction([RATINGS_STORE], 'readonly')
        const store = transaction.objectStore(RATINGS_STORE)
        const request = store.get(quoteId)
        
        request.onsuccess = () => resolve(request.result?.rating || 0)
        request.onerror = () => {
          // Fallback to localStorage
          const ratings = this.getRatingsFromLocalStorage()
          resolve(ratings.get(quoteId) || 0)
        }
      } catch (error) {
        // Fallback to localStorage
        const ratings = this.getRatingsFromLocalStorage()
        resolve(ratings.get(quoteId) || 0)
      }
    })
  }

  async getAllRatings(): Promise<Map<string, number>> {
    if (!this.isIndexedDBSupported || !this.db) {
      // Use localStorage fallback
      return Promise.resolve(this.getRatingsFromLocalStorage())
    }

    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      try {
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
        request.onerror = () => {
          // Fallback to localStorage
          resolve(this.getRatingsFromLocalStorage())
        }
      } catch (error) {
        // Fallback to localStorage
        resolve(this.getRatingsFromLocalStorage())
      }
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

