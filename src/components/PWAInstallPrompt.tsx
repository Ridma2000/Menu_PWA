import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () =>
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )
  }, [])

  if (!installPrompt || isDismissed) {
    return null
  }

  const handleInstall = async () => {
    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md rounded-lg border border-stone-200 bg-white p-3 shadow-2xl sm:bottom-5">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-700">
          <Download className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black text-stone-950">
            Install menu app
          </p>
          <p className="text-xs leading-5 text-stone-500">
            Save it to your device for quick offline access.
          </p>
        </div>
        <button
          type="button"
          onClick={handleInstall}
          className="rounded-lg bg-stone-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-red-800"
        >
          Install
        </button>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-stone-500 transition hover:bg-stone-100"
          aria-label="Dismiss install prompt"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
