import type { Blog } from '~/.contentlayer/generated'
import { Container } from '~/components/ui/container'
import { Twemoji } from '~/components/ui/twemoji'
import type { CoreContent } from '~/types/data'
import { Greeting } from './greeting'
import { Intro } from './intro'
import { LatestPosts } from './latest-posts'
import SplineKeyboard from '../ui/spline-keyboard'
import VisitedMap from '../map/visited-map'

export function Home({ posts }: { posts: CoreContent<Blog>[] }) {
  return (
    <Container as="div" className="mx-auto my-8 flex flex-col items-center px-4">
      <div className="">
        <div className="">
          <div className="flex justify-center">
            <SplineKeyboard />
          </div>
          <div className="flex justify-center">
            <Greeting />
          </div>
          <div className="ml-2 mr-2 text-center text-base leading-7 text-gray-600 dark:text-gray-400 md:ml-3 md:mr-3 md:text-lg md:leading-8">
            <Intro />
            <div className="mb-6 mt-4 space-y-3 md:mb-8">
              <p>
                Now a proud global citizen, currently sweating in Dubai
                <span className="absolute ml-1.5 inline-flex pt-[3px]">
                  <Twemoji emoji="palm-tree" />
                </span>
                .
              </p>
              <p>
                This blog is my open-source brain where I structure and share what I learn, mostly
                about code.
                <span className="absolute ml-1.5 inline-flex pt-[3px]">
                  <Twemoji emoji="brain" />
                </span>
              </p>
              <p>
                I'll also write about health, biohacking, and other human upgrades.
                <span className="absolute ml-1.5 inline-flex pt-[3px]">
                  <Twemoji emoji="dna" />
                </span>
              </p>
              <p>
                My aim is to remember, to share, and maybe to help someone else along the way.
                <span className="absolute ml-1.5 inline-flex pt-[3px]">
                  <Twemoji emoji="waving-handshake" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <VisitedMap />
      <LatestPosts posts={posts} />
    </Container>
  )
}
