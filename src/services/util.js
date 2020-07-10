export const getYoutubeThumbnail = url => {
  if (url && url.match(/youtube/)) {
    const id = url.match(/v=(.+)$/)[1]

    return `https://i.ytimg.com/vi/${id}/mqdefault.jpg`
  }
}
