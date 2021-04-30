import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

type StarProps = {
  selected?: boolean
  onClick: (...args: any[]) => any
}

const Star: React.FC<StarProps> = ({ selected = false, onClick }) => (
  <div>
    {selected ? (
      <AiFillStar onClick={onClick} size={30} className="text-yellow-500" />
    ) : (
      <AiOutlineStar onClick={onClick} size={30} />
    )}
  </div>
)

export default Star
