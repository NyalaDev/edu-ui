export const sendEvent = (event, value, data = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(event, value, { ...data })
  }
}
