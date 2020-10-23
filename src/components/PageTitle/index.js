import React from 'react'
import PropTypes from 'prop-types'
import { StyledContainer, StyledInner, StyledTitle } from './styles'

const PageTitle = ({ title }) => {
  return (
    <StyledContainer>
      <StyledInner className="container">
        <StyledTitle>{title}</StyledTitle>
      </StyledInner>
    </StyledContainer>
  )
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PageTitle
