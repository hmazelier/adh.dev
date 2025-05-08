'use client'
import Spline from '@splinetool/react-spline'
import type { Application } from '@splinetool/runtime'
import { useState } from 'react'
import { ProgressBar } from 'react-loader-spinner'

export default function SplineKeyboard() {
  const [isLoading, setIsLoading] = useState(true)

  function keyboardLoaded(application: Application) {
    const keys = ['aKey', 'dKey', 'hKey', '.devKey']
    keys.forEach((key, index) => {
      setTimeout(
        () => {
          application.emitEvent('mouseDown', key)
        },
        (index + 1) * 100
      )
    })
    keys.forEach((key, index) => {
      setTimeout(
        () => {
          application.emitEvent('mouseUp', key)
        },
        (index + 1) * 150
      )
    })
    setIsLoading(false)
  }

  return (
    <div className="flex h-[300px] items-center justify-center rounded-lg md:h-[300px] lg:h-[300px]">
      <Spline
        scene="https://prod.spline.design/sP6E1jIqGojLceqt/scene.splinecode"
        onLoad={keyboardLoaded}
        // className="w-full h-full"
      />
      <ProgressBar
        visible={isLoading}
        height="100"
        width="100"
        barColor="#e5e7eb"
        borderColor="#e5e7eb"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}
// (big) https://prod.spline.design/ZKE2FIkUsN5Tz2KL/scene.splinecode
//https://prod.spline.design/sP6E1jIqGojLceqt/scene.splinecode
