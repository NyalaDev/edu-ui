import { Lecture } from '../types/api.types'
import { calculateVideosDuration, getYoutubeThumbnail } from './util'

describe('calculateVideosDuration', () => {
  it('Should return correct total duration', () => {
    const data = [
      { duration: 'PT33M17S' },
      { duration: 'PT50M52S' },
      { duration: 'PT32M06S' },
      { duration: 'PT35M40S' },
    ] as Lecture[]
    expect(calculateVideosDuration(data)).toBe('02:31:55')
  })
  it('Should return empty result when duration is empty array', () => {
    const data = [] as Lecture[]
    expect(calculateVideosDuration(data)).toBe('')
  })
})
describe('getYoutubeThumbnail', () => {
  it('Should return thumbnail URL when youtube long URL format is used', () => {
    const videoId = 'J3UynuivVy4'
    const youtubeURL = `https://www.youtube.com/watch?v=${videoId}`
    const expected = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
    expect(getYoutubeThumbnail(youtubeURL)).toBe(expected)
  })
  it('Should return thumbnail URL when  youtube short URL format is used', () => {
    const videoId = 'J3UynuivVy4'
    const youtubeURL = `https://youtu.be/${videoId}`
    const expected = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
    expect(getYoutubeThumbnail(youtubeURL)).toBe(expected)
  })
  it('Should return empty string when youtube URL is not valid', () => {
    const youtubeURL = 'https://www.anothersite.com/watch?v=123'
    expect(getYoutubeThumbnail(youtubeURL)).toBe(
      'https://cdn.nyaladev.com/barmaga.io/nyala-placeholder.png'
    )
  })
})
