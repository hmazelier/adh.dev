import type { Document, MDX } from 'contentlayer2/core'

export type GoodreadsBook = {
  guid: string
  pubDate: string
  title: string
  link: string
  book_id: string
  book_image_url: string
  book_small_image_url: string
  book_medium_image_url: string
  book_large_image_url: string
  book_description: string
  author_name: string
  isbn: string
  user_name: string
  user_rating: string
  user_read_at: string
  user_date_added: string
  user_date_created: string
  user_shelves: string
  user_review: string
  average_rating: number
  book_published: string
  content: string
}

export type VisitedCountry = {
  id: string
  name: string
  year_visited?: string
  visited_places: string[]
  comments: string[]
}

export type MDXDocument = Document & { body: MDX }
export type MDXDocumentDate = MDXDocument & {
  date: string
}

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>
