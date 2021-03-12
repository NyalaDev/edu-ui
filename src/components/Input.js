import React from 'react'
import PropTypes from 'prop-types'
import useLanguage from '../hooks/useLanguage'

const Input = ({
  type,
  label,
  placeholder,
  name,
  onChange,
  error,
  prefix,
  forceLtr,
  width,
  wrapperClasses,
  ...rest
}) => {
  const inputWidth = width || (prefix ? 'w-11/12' : 'w-full')
  const { isRtl } = useLanguage()
  return (
    <div className={`${wrapperClasses || 'mt-4 w-full'}`}>
      {label && (
        <label htmlFor={name} className="font-bold text-grey-darker block mb-2">
          {label}
        </label>
      )}

      {type === 'textarea' && (
        <textarea
          className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          {...rest}
        />
      )}

      {type !== 'textarea' && (
        <div
          className="flex w-full"
          style={{ direction: prefix || !isRtl ? 'ltr' : 'rtl' }}
        >
          {prefix && (
            <div className="mt-2 py-2 w-3/12  align-middle bg-gray-400">
              {prefix}
            </div>
          )}
          <input
            className={`${inputWidth} mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white`}
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            {...rest}
          />
        </div>
      )}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  prefix: PropTypes.string,
  forceLtr: PropTypes.bool,
  width: PropTypes.string,
  wrapperClasses: PropTypes.string,
}

Input.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  error: '',
  prefix: '',
  forceLtr: false,
  width: '',
  wrapperClasses: '',
}

export default Input
