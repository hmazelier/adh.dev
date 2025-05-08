'use client'
import clsx from 'clsx'
import { Twemoji } from '~/components/ui/twemoji'
import Typed from 'typed.js'
import { useRef, useEffect } from 'react'

function createTypedInstance(el: HTMLElement) {
  return new Typed(el, {
    stringsElement: '#bios',
    typeSpeed: 100,
    autoInsertCss: true,
    cursorChar: '|', // specify the cursor character
    // attr: 'text-4xl font-extrabold' , // specify additional HTML attributes
    // backSpeed: 100,
    loop: false,
    showCursor: true,
    // backDelay: 1000,
    onComplete: (typed) => {
      typed.stop()
    },
  })
}

export function Greeting() {
  const el = useRef(null)
  const typed = useRef<Typed | null>(null)

  useEffect(() => {
    if (el.current) {
      typed.current = createTypedInstance(el.current)
    }
    return () => {
      typed?.current?.destroy()
    }
  }, [])
  return (
    <div
      className={clsx(
        'font-greeting font-extrabold tracking-tight',
        'text-[40px] leading-[60px]',
        'bg-clip-text text-transparent',
        'bg-slate-300',
        '[&_.typed-cursor]:inline-block',
        '[&_.typed-cursor]:w-2',
        '[&_.typed-cursor]:text-transparent',
        '[&_.typed-cursor]:leading-[2.5rem]',
        '[&_.typed-cursor]:leading-[2.3rem]',
        '[&_.typed-cursor]:bg-slate-800',
        'dark:[&_.typed-cursor]:bg-slate-100'
      )}
    >
      <div>
        <ul id="bios" className="hidden">
          <li>Hi, it's Hadrien! </li>
        </ul>
        <span ref={el} className="font-extrabold tracking-tighter" />
      </div>
    </div>
  )
}
