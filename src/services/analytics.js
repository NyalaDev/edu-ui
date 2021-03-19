export const sendEvent = (event, data = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, { ...data })
  }
}
