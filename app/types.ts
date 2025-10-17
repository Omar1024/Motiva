export type Language = 'en' | 'ar'

export type Category = 'motivation' | 'success' | 'wisdom' | 'study' | 'life_lessons' | 'all'

export interface Quote {
  id: string
  text: string
  author: string
  category: Category
}

export interface QuoteRating {
  quoteId: string
  rating: number
}

export interface FavoriteQuote extends Quote {
  language: Language
  favoritedAt: number
}

export interface AppState {
  currentQuote: Quote | null
  usedQuotes: Set<string>
  favorites: Map<string, FavoriteQuote>
  ratings: Map<string, number>
  language: Language
  category: Category
  statistics: {
    totalViewed: number
    totalFavorited: number
    totalRated: number
  }
}


