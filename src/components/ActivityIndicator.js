import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledSpinner = styled.div`
  border: 5px solid #fbf1e6;
  border-top: 5px solid #2d3747;
  border-radius: 50%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  animation: spin 1s linear infinite;
  margin: ${({ margin }) => margin};

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const ActivityIndicator = ({ active, children, size, margin }) => {
  if (!active) {
    return <>{children}</>
  }

  return (
    <div className="flex justify-center">
      <StyledSpinner size={size} margin={margin} />
    </div>
  )
}

ActivityIndicator.propTypes = {
  active: PropTypes.bool,
  size: PropTypes.number,
  margin: PropTypes.string,
}

ActivityIndicator.defaultProps = {
  active: false,
  size: 40,
  margin: '0px',
}

export default ActivityIndicator
