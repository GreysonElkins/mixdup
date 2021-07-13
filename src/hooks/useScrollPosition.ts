import { useLayoutEffect, useRef } from 'react'

const getScrollPosition = ({ element, useWindow }:{ element?: any, useWindow?: boolean }) => {
  if (typeof window === 'undefined') {return { x: 0, y: 0 }}
  
  const target = element ? element.current : document.body
  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

export type EffectProps = {
  prevPos: any
  currPos: any
}

type HookProps = {
  effect: (val: EffectProps) => void
  deps?: any[]
  useWindow?: boolean
  element?: any
  wait?: number
}

export const useScrollPosition = ({ effect, deps = [], wait, useWindow, element }: HookProps) => {
  
  const position = useRef(getScrollPosition({ useWindow }))
  let throttleTimeout: any = null

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow })
    effect({ prevPos: position.current, currPos })
    position.current = currPos
    throttleTimeout = null
  }

  useLayoutEffect(() => {
    console.log('effect')
    const handleScroll = () => {
      console.log('scrolling')
      if (wait && throttleTimeout === null) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        throttleTimeout = setTimeout(callBack, wait)
      } else {
        callBack()
      }
    }

    const target = element ? element.current : window

    target.addEventListener('scroll', () => handleScroll)

    return () => target.removeEventListener('scroll', handleScroll)
  }, [...deps, position])
}