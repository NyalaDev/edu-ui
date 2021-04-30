import { useEffect } from 'react'

const events = [`mousedown`, `touchstart`]

export default (
  ref: React.RefObject<HTMLDivElement>,
  onClickOutside: VoidFunction
): void => {
  const isOutside = (element: EventTarget | null) =>
    !ref.current || !ref.current.contains(element as Node)

  const onClick = (event: Event) => {
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
