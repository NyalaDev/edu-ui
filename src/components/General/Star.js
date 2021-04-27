import React from 'react'
import PropTypes from 'prop-types'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const Star = ({ selected = false, onClick }) => (
  <div>
    {selected ? (
      <AiFillStar onClick={onClick} size={30} className="text-yellow-500" />
    ) : (
      <AiOutlineStar onClick={onClick} size={30} />
    )}
  </div>
)

export default Star

Star.propTypes = {
  selected: PropTypes.bool,

  onClick: PropTypes.func.isRequired,
}

Star.defaultProps = {
  selected: false,
}
