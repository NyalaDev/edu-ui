import React from 'react'
import styled from 'styled-components'

type ButtonProps = { readOnly: boolean | undefined }

const StyledButton = styled.button<ButtonProps>`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: ${({ readOnly }) => (readOnly ? 'inherit' : 'pointer')};
  outline: 0 !important;
`
type ClickableProps = {
  onClick: ((...args: any[]) => any) | undefined
  readOnly?: boolean
}
const Clickable: React.SFC<ClickableProps> = ({
  onClick,
  children,
  readOnly,
  ...rest
}) => (
  <StyledButton
    type="button"
    onClick={onClick}
    disabled={readOnly}
    readOnly={readOnly}
    {...rest}
  >
    {children}
  </StyledButton>
)

export default Clickable
