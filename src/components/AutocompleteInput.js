import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import useClickOutside from '../hooks/useClickOutside'
import Input from './Input'
import Clickable from './Clickable'

const AutoCompleteInput = ({
  name,
  label,
  placeholder,
  initialValue,
  options,
  onSelect,
  onBlur,
  error,
}) => {
  const value = (initialValue && initialValue.name) || ''
  const containerRef = useRef()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(value)

  const handleItemClick = item => {
    setSearch(item.name)
    setOpen(false)
    onSelect(item)
  }

  useClickOutside(containerRef, () => setOpen(false))

  return (
    <div className="flex flex-col w-full" ref={containerRef}>
      <Input
        onClick={() => setOpen(!open)}
        name={name}
        placeholder={placeholder}
        label={label}
        value={search}
        onChange={e => setSearch(e.target.value)}
        error={error}
        onBlur={onBlur}
      />
      {open && (
        <div className="border border-gray-500 overflow-auto w-full h-40">
          {options
            .filter(
              item => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
            )
            .map(item => (
              <Clickable
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="w-full"
              >
                <div className="hover:bg-gray-500 cursor-pointer p-2 border-b-2 flex">
                  <span>{item.name}</span>
                </div>
              </Clickable>
            ))}
        </div>
      )}
    </div>
  )
}

AutoCompleteInput.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.shape({
    name: PropTypes.string,
  }),
}
AutoCompleteInput.defaultProps = {
  error: '',
  onBlur: () => {},
  placeholder: '',
  label: '',
  initialValue: {},
}

export default AutoCompleteInput
