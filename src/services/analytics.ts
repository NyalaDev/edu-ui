/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const sendEvent = (event: any, data = {}): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, { ...data })
  }
}
