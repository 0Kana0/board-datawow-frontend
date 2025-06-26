'use client';
import React, { createContext, useContext, useState } from 'react'

type SelectedCommunitySend = {
  id: number,
  communityname: string
}

type DropdownModalContextType = {
  isOpen: boolean
  toggle: () => void
  close: () => void
  selectedCommunity: SelectedCommunitySend
  setSelectedCommunity: React.Dispatch<React.SetStateAction<SelectedCommunitySend>>;
}

const DropdownModalContext = createContext<DropdownModalContextType | undefined>(undefined)

export const DropdownModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCommunity, setSelectedCommunity] = useState<SelectedCommunitySend>({
    id: 0,
    communityname: ''
  })

  const toggle = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <DropdownModalContext.Provider value={{ isOpen, toggle, close, selectedCommunity, setSelectedCommunity }}>
      {children}
    </DropdownModalContext.Provider>
  )
}

export const useDropdownModal = () => {
  const context = useContext(DropdownModalContext)
  if (!context) throw new Error("useDropdownModal must be used within DropdownModalProvider")
  return context
}
