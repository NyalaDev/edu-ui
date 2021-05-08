/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
declare global {
  interface Window {
    plausible: (event: string, data: { callback: VoidFunction } | any) => void
  }
}

export const sendEvent = (event: string, data = {}): void => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(event, data)
  }
}
