import React from 'react'
import PropTypes from 'prop-types'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const Star = ({ selected = false, size = 24, onClick }) =>
  selected ? (
    <AiFillStar onClick={onClick} size={size} />
  ) : (
    <AiOutlineStar onClick={onClick} size={size} />
  )

export default Star

Star.propTypes = {
  selected: PropTypes.bool,
  size: PropTypes.number,
  onClick: PropTypes.func.isRequired,
}

Star.defaultProps = {
  selected: false,
  size: 24,
}
