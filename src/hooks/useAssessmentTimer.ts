import { useEffect, useRef, useState } from 'react'

export function useAssessmentTimer() {
  const startedAtRef = useRef(Date.now())
  const finalElapsedSecondsRef = useRef<number | null>(null)

  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const intervalId = window.setInterval(() => {
      const elapsedMilliseconds =
        Date.now() - startedAtRef.current

      setElapsedSeconds(
        Math.floor(elapsedMilliseconds / 1000),
      )
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isRunning])

   const stop = () => {
    if (finalElapsedSecondsRef.current !== null) {
      return finalElapsedSecondsRef.current
    }

    const elapsedMilliseconds =
      Date.now() - startedAtRef.current

    const finalElapsedSeconds = Math.floor(
      elapsedMilliseconds / 1000,
    )

    finalElapsedSecondsRef.current = finalElapsedSeconds

    setElapsedSeconds(finalElapsedSeconds)
    setIsRunning(false)

    return finalElapsedSeconds
  }

  return {
    elapsedSeconds,
    isRunning,
    stop,
  }
}