'use client'

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

declare global {
  interface Window {
    luminaSetLoadingAudio?: (playing: boolean) => void
  }
}

export default function LoadingBridge({ audioOn, onAudioRequest, onComplete, visible }: { audioOn: boolean; onAudioRequest: (playing: boolean) => void; onComplete: () => void; visible: boolean }) {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const previousAudioOn = useRef(audioOn)

  useLayoutEffect(() => {
    const requestAudio = (playing: boolean) => onAudioRequest(playing)
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return
      if (event.data?.type === 'lumina-loading-complete') {
        const loadingWindow = frameRef.current?.contentWindow as (Window & { runId?: number; running?: boolean }) | null
        if (event.data.runId === loadingWindow?.runId && loadingWindow?.running === false) onComplete()
      }
      if (event.data?.type === 'lumina-audio-request' && typeof event.data.playing === 'boolean') onAudioRequest(event.data.playing)
    }

    window.luminaSetLoadingAudio = requestAudio
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
      if (window.luminaSetLoadingAudio === requestAudio) delete window.luminaSetLoadingAudio
    }
  }, [onAudioRequest, onComplete])

  const syncAudioState = useCallback(() => {
    frameRef.current?.contentWindow?.postMessage(
      { type: 'lumina-audio-state', playing: audioOn },
      window.location.origin,
    )
  }, [audioOn])

  useEffect(() => {
    if (previousAudioOn.current === audioOn) return
    previousAudioOn.current = audioOn
    syncAudioState()
  }, [audioOn, syncAudioState])

  return <div className={`startup-loader ${visible ? '' : 'startup-loader-hidden'}`} aria-hidden={!visible}>
    <iframe ref={frameRef} src="/loading.html" title="Portfolio loading screen" onLoad={syncAudioState} />
  </div>
}
