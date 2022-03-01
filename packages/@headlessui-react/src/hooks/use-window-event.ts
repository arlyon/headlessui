import { MutableRefObject, useEffect } from 'react'

import { getOwnerWindow } from '../utils/owner'
import { useLatestValue } from './use-latest-value'

export function useWindowEvent<TType extends keyof WindowEventMap>(
  type: TType,
  listener: (ev: WindowEventMap[TType]) => any,
  options?: boolean | AddEventListenerOptions,
  contextElement: Element | MutableRefObject<Element | null> | null = null
) {
  let listenerRef = useLatestValue(listener)
  let target = getOwnerWindow(contextElement)
  console.log(target, target.document)

  useEffect(() => {
    function handler(event: WindowEventMap[TType]) {
      listenerRef.current(event)
    }

    target.addEventListener(type, handler, options)
    return () => target.removeEventListener(type, handler, options)
  }, [type, options, target])
}
