import moment from 'moment'
import { isEmpty } from 'lodash'
import { DEFAULT_PROFILE_PIC } from './const'

/**
 * Format a duration
 * @param {*} duration Duration (eg PT23M11S)
 * @param {*} format Optional - The format value. Default is HH:mm:ss
 * @return Formated duration - eg 00:23:11
 */
export const formatDuration = (duration, format = 'HH:mm:ss') => {
  return moment.utc(moment.duration(duration).as('milliseconds')).format(format)
}

/**
 * Get Youtube Video Thumnail
 * @param {*} url The youtube vido URL
 * @return The Thumbnail URL
 */
export const getYoutubeThumbnail = url => {
  try {
    const VALIDATE_YOUTUBE_REGEX = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/watch\?v=([^&]+)/m
    if (url && VALIDATE_YOUTUBE_REGEX.test(url) && url.match(/youtube/)) {
      const id = url.match(/v=(.+)$/)[1]
      return id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : ''
    }
    return ''
  } catch (e) {
    return ''
  }
}

/**
 * Calculation total duration of lecutes
 * @param {*} lectures The courses lectures array from Strapi
 * @return total duration in format HH:mm:ss (.e.g 1:20:15)
 */
export const calculateVideosDuration = (lectures = []) => {
  if (isEmpty(lectures)) {
    return ''
  }
  const { duration = 0 } = lectures[0] || {}
  const totalDuration = lectures
    .slice(1)
    .reduce(
      (prev, cur) => moment.duration(cur.duration).add(prev),
      moment.duration(duration)
    )
  return moment.utc(totalDuration.asMilliseconds()).format('HH:mm:ss')
}

/**
 * Helper function to get profile picture from the user object
 * @param {*} user the current user
 */
export const getProfilePicuteUrlFromUserObject = user => {
  if (!user || isEmpty(user)) {
    return DEFAULT_PROFILE_PIC
  }

  // TODO: use the CDN link instead of the s3 ?
  try {
    const { profile } = user
    const {
      profilepicture: { url },
    } = profile

    return url || DEFAULT_PROFILE_PIC
  } catch (error) {
    return DEFAULT_PROFILE_PIC
  }
}
