import React from 'react'

type InputWithAddOnProps = {
  id: string
  prefix: string
  placeholder: string
}
const InputWithAddOn: React.FC<InputWithAddOnProps> = ({
  id,
  prefix,
  placeholder,
  ...reset
}) => (
  <div className="flex flex-wrap items-stretch w-full mb-4 relative">
    <div className="flex -mr-px">
      <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-r-none border border-r-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">
        {prefix}
      </span>
    </div>
    <input
      id={id}
      placeholder={placeholder}
      type="text"
      className="flex-shrink flex-grow flex-auto leading-normal w-px  bg-white border border-grey-light h-10 rounded rounded-l-none px-3 relative"
      {...reset}
    />
  </div>
)
export default InputWithAddOn
