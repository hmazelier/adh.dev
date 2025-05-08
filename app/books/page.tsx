import { Suspense } from 'react'
import { genPageMetadata } from '~/app/seo'
import { Container } from '~/components/ui/container'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Image, Zoom } from '~/components/ui/image'
import { Link } from '~/components/ui/link'
import { PageHeader } from '~/components/ui/page-header'
import { SITE_METADATA } from '~/data/site-metadata'
import books from '~/json/books.json' assert { type: 'json' }
import type { GoodreadsBook } from '~/types/data'
import { BooksList } from './books-list'

export let metadata = genPageMetadata({ title: 'My bookshelf' })

export default async function BooksPage() {
  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title="Books"
        description={
          <>
            <p>
              As a kid with ADHD, reading felt more like a punishment than a pleasure—school made it
              rigid, forced, and frustrating. But in my twenties, something shifted. Freed from the
              classroom’s constraints, I discovered reading on my own terms—and I’ve been hooked
              ever since.
            </p>
            <p>
              From sci-fi and classics to biographies, I’ve devoured it all. This space is where
              I’ll share that journey—partly to reflect, partly so I don’t forget.
            </p>
            <p className="mt-3 italic">
              *Data pulled from my{' '}
              <Link href={SITE_METADATA.goodreadsBookshelfUrl} className="font-medium">
                <GrowingUnderline data-umami-event="goodreads-feed" active>
                  Goodreads bookshelf
                </GrowingUnderline>
              </Link>
              .
            </p>
          </>
        }
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <Suspense>
        <BooksList
          books={
            books.sort(
              (a, b) => Number(b.user_rating) - Number(a.user_rating)
            ) as unknown as GoodreadsBook[]
          }
        />
      </Suspense>
    </Container>
  )
}
