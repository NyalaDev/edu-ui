import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

type ModalProps = {
  title?: string
  onDismiss?: (...args: any[]) => any
  onAction?: (...args: any[]) => any
  closeLabel: string
  confirmLabel: string
  withActions?: boolean
  titleCentered?: boolean
  large?: boolean
}
const Modal: React.SFC<ModalProps> = ({
  title,
  onDismiss,
  onAction,
  children,
  closeLabel,
  confirmLabel,
  withActions,
  titleCentered,
  large,
}) => {
  const { t } = useTranslation()
  return (
    <>
      <div className="justify-center mt-16 sm:mt-64 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className={`w-9/12 ${large ? '' : 'md:max-w-md '}mx-auto rounded`}>
          <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex flex-row items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3
                className={`text-lg sm:text-2xl title flex-1 ${
                  titleCentered ? 'text-center' : ''
                }`}
              >
                {title}
              </h3>
              {onDismiss && (
                <button
                  type="button"
                  className="p-1 bg-transparent border-0 text-black opacity-5 text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onDismiss}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              )}
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
      <div className="bg-gray-900 opacity-50 fixed inset-0 z-40" />
    </>
  )
}

export default Modal
