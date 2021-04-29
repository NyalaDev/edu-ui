import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledSpinner = styled.svg<{ size: number }>`
  animation: rotate 2s linear infinite;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`
type SpinnerProps = {
  size: number
}
const Spinner: React.FC<SpinnerProps> = ({ size }) => (
  <StyledContainer>
    <StyledSpinner viewBox="0 0 50 50" size={size}>
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
      />
    </StyledSpinner>
  </StyledContainer>
)

export default Spinner
