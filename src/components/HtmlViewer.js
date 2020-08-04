import React from 'react'
import PropTypes from 'prop-types'

const HtmlViewer = ({ data, ...rest }) => {
  // eslint-disable-next-line react/no-danger
  return <div {...rest} dangerouslySetInnerHTML={{ __html: data }} />
}

HtmlViewer.propTypes = {
  data: PropTypes.string,
}

HtmlViewer.defaultProps = {
  data: '',
}
export default HtmlViewer
