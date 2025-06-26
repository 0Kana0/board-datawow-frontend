'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type FilterCommunitySend = {
  id: number,
  communityname: string
}

type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  filterCommunity: FilterCommunitySend
  setFilterCommunity: React.Dispatch<React.SetStateAction<FilterCommunitySend>>;
};

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterCommunity, setFilterCommunity] = useState<FilterCommunitySend>({
    id: 0,
    communityname: ''
  })

  const toggle = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close, filterCommunity, setFilterCommunity }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('useDropdown ต้องใช้ภายใต้ <DropdownProvider>');
  return context;
};
