import { isEmpty } from 'lodash'
import { Duration } from 'luxon'
import { Lecture, User } from '../types/api.types'
import { DEFAULT_PROFILE_PIC } from './constants'

const getYoutubeVideoId = (url: string) => {
  // eslint-disable-next-line no-useless-escape
  const EXTRACT_YOUTUBE_REGEX = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
  const match = url.match(EXTRACT_YOUTUBE_REGEX)
  if (match && match[7].length === 11) {
    return match[7]
  }
  return null
}
/**
 * Get Youtube Video Thumnail
 * @param {*} url The youtube vido URL
 * @return The Thumbnail URL
 */
export const getYoutubeThumbnail = (url: string): string | undefined => {
  try {
    const videoId = getYoutubeVideoId(url)
    return videoId
      ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
      : undefined
  } catch (e) {
    return undefined
  }
}
/**
 * Format a duration
 * @param {*} duration Duration (eg PT23M11S)
 * @param {*} format Optional - The format value. Default is HH:mm:ss
 * @return Formated duration - eg 00:23:11
 */
export const formatDuration = (duration: string, format = 'hh:mm:ss'): string =>
  Duration.fromISO(duration).toFormat(format)
/**
 * Calculation total duration of lecutes
 * @param {*} lectures The courses lectures array from Strapi
 * @return total duration in format HH:mm:ss (.e.g 1:20:15)
 */
export const calculateVideosDuration: (lectures: Lecture[]) => string = (
  lectures = []
) => {
  if (isEmpty(lectures)) {
    return ''
  }
  const { duration = '0' } = lectures[0] || {}
  const totalDuration = lectures
    .slice(1)
    .reduce(
      (prev, cur) => Duration.fromISO(cur.duration).plus(prev),
      Duration.fromISO(duration)
    )
  return totalDuration.toFormat('hh:mm:ss')
}
export const getPercentage = (number: number, total: number): number =>
  Math.round((number / total) * 100)
/**
 * Helper function to get profile picture from the user object
 * @param {*} user the current user
 */
export const getProfilePicuteUrlFromUserObject = (
  user: User | null
): string => {
  if (!user || isEmpty(user)) {
    return DEFAULT_PROFILE_PIC
  }
  // TODO: use the CDN link instead of the s3 ?
  try {
    const url = user?.profile?.profilepicture?.url
    return url || DEFAULT_PROFILE_PIC
  } catch (error) {
    return DEFAULT_PROFILE_PIC
  }
}
export const isTeacher = (user: User | null): boolean => {
  try {
    if (!user) return false
    const { role } = user
    return role.name.toLowerCase() === 'teacher'
  } catch (e) {
    return false
  }
}
