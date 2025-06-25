'use client';
import React, { createContext, useContext, useState } from 'react'

type DropdownModalContextType = {
  isOpen: boolean
  toggle: () => void
  close: () => void
  selectedCommunity: number | null
  setSelectedCommunity: (community: number | null) => void
}

const DropdownModalContext = createContext<DropdownModalContextType | undefined>(undefined)

export const DropdownModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(null)

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
