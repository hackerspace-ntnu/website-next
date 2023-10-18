import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'

import ModalContext from './ModalContext';

import AuthModal from '../../modals/AuthModal';

// Modals list (could use state, to dynamically add / update modals)
const modals: { [key: string]: React.ReactNode; } = {
  auth: <AuthModal />,
}

// Context Provider Interface
interface ModalProviderProps {
  children?: React.ReactNode
}

// Context Provider Function
const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useState<string | null>(null);
  const [is_open, setIsOpen] = useState<boolean>(false);

  const open = (modalType: string) => {
    setModal(modalType);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);

    // Allowing the close animation to play
    // Read: https://reactcommunity.org/react-modal/styles/transitions/
    setTimeout(() => {
      setModal(null);
    }, 100);
  };

  // Effect for loading the modal from the url on mount
  useEffect(() => {
    const modalFromUrl = searchParams.get('modal');
    console.log(modalFromUrl);
    if (modalFromUrl !== null) {
      open(modalFromUrl);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  // Effect for storing the modal in the url
  useEffect(() => {
    if (modal !== null) {
      setSearchParams({modal: modal})
    }
    else {
      setSearchParams({})
    }
  
    return () => {
      setSearchParams({})
    }
  }, [setSearchParams, modal])
  

  return (
    <ModalContext.Provider value={{ open, close, current: modal, is_open }}>
      {modal !== null ? modals[modal] : null}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider