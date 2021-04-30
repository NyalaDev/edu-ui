import React from 'react'
import { StyledContainer, StyledInner, StyledTitle } from './styles'

type PageTitleProps = {
  title: string
}
const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
  <StyledContainer>
    <StyledInner className="container">
      <StyledTitle>{title}</StyledTitle>
    </StyledInner>
  </StyledContainer>
)
export default PageTitle
