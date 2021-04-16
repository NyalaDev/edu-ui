import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Star from './Star'

const RatingStars = ({ currentRating = 0 }) => {
  const totalStars = 5
  const [selected, setSelect] = useState(currentRating)
  return (
    <div className="flex">
      {[...Array(totalStars)].map((n, i) => (
        <Star
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          selected={i < selected}
          onClick={() => setSelect(i + 1)}
        />
      ))}
      <p>
        {selected} of {totalStars} stars
      </p>
    </div>
  )
}

export default RatingStars

RatingStars.propTypes = {
  currentRating: PropTypes.number,
}

RatingStars.defaultProps = {
  currentRating: 0,
}
