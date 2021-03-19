import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { Duration } from 'luxon'
import { DEFAULT_PROFILE_PIC } from './constants'

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
    return 'https://cdn.nyaladev.com/barmaga.io/nyala-placeholder.png'
  } catch (e) {
    return 'https://cdn.nyaladev.com/barmaga.io/nyala-placeholder.png'
  }
}

/**
 * Format a duration
 * @param {*} duration Duration (eg PT23M11S)
 * @param {*} format Optional - The format value. Default is HH:mm:ss
 * @return Formated duration - eg 00:23:11
 */
export const formatDuration = (duration, format = 'hh:mm:ss') => {
  return Duration.fromISO(duration).toFormat(format)
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

  const totalDuration = lectures.slice(1).reduce((prev, cur) => {
    return Duration.fromISO(cur.duration).plus(prev)
  }, Duration.fromISO(duration))

  return totalDuration.toFormat('hh:mm:ss')
}

export const getPercentage = (number, total) =>
  Math.round((number / total) * 100)

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

export const isTeacher = user => {
  try {
    const { role = {} } = user
    return role.name.toLowerCase() === 'teacher'
  } catch (e) {
    return false
  }
}

export const CoursePropType = PropTypes.shape({
  language: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  title: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  status: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      tagName: PropTypes.string,
    })
  ),
  github_repo: PropTypes.string,
})
