import React from 'react'
import ReactModal from 'react-modal';

import { useModal } from '../context/modal/ModalHook';

import { FaTimes } from 'react-icons/fa'

// Modal Interface
interface ModalProps {
  title?: string,
  icon?: React.ReactNode,
  className?: string,
  overlayClassName?: string,
  contentClassName?: string,
  children?: React.ReactNode
}

// Modal Function: The base structure for each modal.
const Modal: React.FC<ModalProps> = ({ title, icon, className, overlayClassName, contentClassName, children }) => {

  const modal = useModal();

  return (
    <ReactModal
      isOpen={modal.is_open}
      onRequestClose={modal.close}
      overlayClassName={`${overlayClassName} flex items-center justify-center p-2 fixed top-0 left-0 right-0 bottom-0 bg-overlay-900 z-50`}
      className={`${className} bg-accent-900 text-text-50 rounded-md opacity-100 w-full max-w-modal min-w-modal max-h-modal outline-none overflow-y-scroll`}
      contentLabel={title}
      closeTimeoutMS={100}
    >
      <div className='flex flex-col'>
        <div className='flex items-center justify-between p-6'>
          <div className='flex items-center'>
            {icon}
            <h3 className='ml-2'>{title}</h3>
          </div>
          <button onClick={modal.close} className='py-2'>
            <FaTimes />
          </button>
        </div>
        <div className={`${contentClassName} flex flex-col space-y-4 px-6 pb-6`}>
          {children}
        </div>
      </div>
    </ReactModal>
  );

}

export default Modal;