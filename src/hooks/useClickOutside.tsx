import { useEffect } from 'react'

const events = [`mousedown`, `touchstart`]

export default (ref: any, onClickOutside: any): any => {
  const isOutside = (element: any) =>
    !ref.current || !ref.current.contains(element)
  const onClick = (event: any) => {
    if (isOutside(event.target)) {
      onClickOutside()
    }
  }
  useEffect(() => {
    events.forEach(event => document.addEventListener(event, onClick))
    return () => {
      events.forEach(event => document.removeEventListener(event, onClick))
    }
  })
}
