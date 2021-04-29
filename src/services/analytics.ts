export const sendEvent = (event: any, data = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, { ...data })
  }
}
