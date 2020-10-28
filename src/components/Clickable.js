import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: ${({ readOnly }) => (readOnly ? 'inherit' : 'pointer')};
  outline: 0 !important;
`

const Clickable = ({ onClick, children, readOnly, ...rest }) => {
  return (
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
}

Clickable.propTypes = {
  onClick: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
}

Clickable.defaultProps = {
  readOnly: false,
}

export default Clickable
