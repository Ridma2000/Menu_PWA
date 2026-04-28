const LIKES_STORAGE_KEY = 'restaurant-menu-likes-v1'

export type LikeCounts = Record<string, number>

const isPlainRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const loadLikeCounts = (): LikeCounts => {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const rawData = window.localStorage.getItem(LIKES_STORAGE_KEY)
    const parsedData: unknown = rawData ? JSON.parse(rawData) : null

    if (!isPlainRecord(parsedData)) {
      return {}
    }

    return Object.entries(parsedData).reduce<LikeCounts>(
      (likes, [itemId, count]) => {
        const normalizedCount =
          typeof count === 'number' && Number.isFinite(count)
            ? Math.max(0, Math.floor(count))
            : 0

        if (itemId && normalizedCount > 0) {
          likes[itemId] = normalizedCount
        }

        return likes
      },
      {},
    )
  } catch {
    return {}
  }
}

export const saveLikeCounts = (likeCounts: LikeCounts) => {
  window.localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likeCounts))
}
