import styled from 'styled-components'
import { FaVideo, FaLock } from 'react-icons/fa'

export const StyledLectureList = styled.ul`
  border-bottom: 1px solid #d4d4d4;
  margin: 0;
  list-style: none;
  padding: 0;
`
export const StyledLectureListItem = styled.li`
  position: relative;
  border-top: 1px solid #d4d4d4;
  border-right: 1px solid #d4d4d4;
  background-color: ${({ active }) => (active ? '#fff' : '#eee')};
  transition: all 0.3s ease 0s;
`

export const StyledCount = styled.div`
  position: absolute;
  width: 46px;
  height: 100%;
  background-color: #ddd;
  text-align: center;
  z-index: 1;
  span {
    display: inline-block;
    position: absolute;
    font-size: 16px;
    font-weight: 700;
    color: #666;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    margin: 0;
  }
`

export const StyledListBody = styled.div`
  position: relative;
  padding: 16px 130px 16px 105px;
  :hover {
    background-color: #fff;
  }
  width: 100%;
`

export const StyledDuration = styled.div`
  font-size: 14px;
  color: #a6a6a6;
  margin-top: 10px;
`

export const StyledVideoIcon = styled(FaVideo)`
  position: absolute;
  font-size: 12px;
  color: #a6a6a6;
  left: 68px;
  top: 50%;
  transform: translateY(-50%);
`

export const StyledLockIcon = styled(FaLock)`
  position: absolute;
  font-size: 12px;
  color: #a6a6a6;
  left: 68px;
  top: 50%;
  transform: translateY(-50%);
`
