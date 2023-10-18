import { createContext } from 'react';

// Context Interface
export interface ModalContextType {
  open: (modalType: string) => void;
  close: () => void;
  current: string | null;
  is_open: boolean;
}

// Context Creation
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export default ModalContext