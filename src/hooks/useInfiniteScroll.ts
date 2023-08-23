import {
  useEffect,
  useState,
  RefObject,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react"

export interface IUseInfiniteScroll {
  isLoading: boolean
  targetRef: RefObject<HTMLElement> | null
  isComplete: boolean
  setIsComplete: Dispatch<SetStateAction<boolean>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function useInfiniteScroll(
  targetRef: RefObject<HTMLElement> | null,
  callback: (props: IUseInfiniteScroll) => void
) {
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const loadMoreData = useCallback(async () => {
    if (isLoading) return

    setIsLoading(true)
    const state = {
      isLoading,
      targetRef,
      isComplete,
      setIsComplete,
      setIsLoading,
    }
    callback(state) // Execute the provided callback
  }, [callback, isComplete, isLoading, targetRef])

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isComplete) loadMoreData()
        }
      })
    },
    [isComplete, loadMoreData]
  )

  useEffect(() => {
    if (targetRef && targetRef.current) {
      const observerOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }

      const observer = new IntersectionObserver(
        observerCallback,
        observerOptions
      )
      observer.observe(targetRef.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [observerCallback, targetRef])
  
  return {
    isLoading,
    targetRef,
    isComplete,
    setIsComplete,
    setIsLoading,
  }
}
