import React from 'react'
import styled from 'styled-components'

type StyledSpinnerProps = {
  size: number | undefined
  margin: number | undefined
}

const StyledSpinner = styled.div<StyledSpinnerProps>`
  border: 5px solid #fbf1e6;
  border-top: 5px solid #2d3747;
  border-radius: 50%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  animation: spin 1s linear infinite;
  margin: ${({ margin }) => margin}px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
type ActivityIndicatorProps = {
  active?: boolean
  size?: number
  margin?: number
}
const ActivityIndicator: React.FunctionComponent<ActivityIndicatorProps> = ({
  active,
  children,
  size,
  margin,
}) => {
  if (!active) {
    return <>{children}</>
  }
  return (
    <div className="flex justify-center">
      <StyledSpinner size={size} margin={margin} />
    </div>
  )
}

export default ActivityIndicator
