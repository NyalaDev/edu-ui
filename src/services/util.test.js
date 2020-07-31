import { calculateVideosDuration } from './util'

describe('calculateVideosDuration', () => {
  test('sum lecture duration', () => {
    const data = [
      { duration: '00:10' },
      { duration: '00:15' },
      { duration: '1:05' },
      { duration: '0:10' },
    ]
    expect(calculateVideosDuration(data)).toBe('01:40:00')
  })

  test('empty lectures array returns empty result', () => {
    const data = []
    expect(calculateVideosDuration(data)).toBe('')
  })
})
