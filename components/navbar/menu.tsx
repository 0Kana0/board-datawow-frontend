'use client'
import { useSidebar } from '@/hooks/SidebarContext'
import { AlignJustify, MenuIcon } from 'lucide-react'
import React from 'react'

const Menu = () => {
  const { toggle } = useSidebar()

  return (
    <div className="menu-mobile">
      <button onClick={toggle}>
        <AlignJustify />
      </button>
    </div>
  )
}

export default Menu