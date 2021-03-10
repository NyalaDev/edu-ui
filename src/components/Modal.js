import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const Modal = ({
  title,
  onDismiss,
  onAction,
  children,
  closeLabel,
  confirmLabel,
  withActions,
}) => {
  const { t } = useTranslation()
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="w-9/12">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex flex-row items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">{title}</h3>
              <button
                type="button"
                className="p-1 bg-transparent border-0 text-black opacity-5 text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onDismiss}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>

            <div className="flex-auto">{children}</div>

            {withActions && (
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={onDismiss}
                >
                  {t(closeLabel)}
                </button>
                <button
                  className="bg-gray-800 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={onAction}
                >
                  {t(confirmLabel)}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40" />
    </>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
  onAction: PropTypes.func,
  closeLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  withActions: PropTypes.bool,
}

Modal.defaultProps = {
  title: '',
  closeLabel: 'close',
  confirmLabel: 'save',
  withActions: true,
  onAction: () => {},
}

export default Modal
