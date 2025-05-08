import { clsx } from 'clsx'
import { GritBackground } from '~/components/ui/grit-background'
import { Image, Zoom } from '~/components/ui/image'
import { capitalize, kebabCaseToPlainText } from '~/utils/misc'

export function Banner({ banner, className }: { banner: string; className?: string }) {
  let handle = banner.split('/').pop() || ''
  return (
    <div className={clsx('relative', className)}>
      <Zoom>
        <Image
          src={banner}
          alt={capitalize(kebabCaseToPlainText(handle)) || 'Article banner photo'}
          width={1600}
          height={900}
          className="h-auto w-full rounded-lg"
        />
      </Zoom>
      <GritBackground className="inset-0 rounded-lg opacity-75" />
    </div>
  )
}
