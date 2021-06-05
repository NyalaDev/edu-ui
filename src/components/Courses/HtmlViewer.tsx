import React from 'react'

type HtmlViewerProps = {
  data: string
  className?: string
}
const HtmlViewer: React.FC<HtmlViewerProps> = ({ data, ...rest }) => (
  // eslint-disable-next-line react/no-danger
  <div {...rest} dangerouslySetInnerHTML={{ __html: data }} />
)

export default HtmlViewer
