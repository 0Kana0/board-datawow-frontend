'use client'
import { useSidebar } from '@/hooks/SidebarContext'
import { ArrowRight, House, SquarePen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SideMenu = () => {
  const {isOpen, close} = useSidebar()

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={close}></div>

      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-close">
          <ArrowRight onClick={close} className='sidebar-arrow'/>
        </div>
        <ul>
          <li>
            <Link href="/" className="sidebar-link" onClick={close}>
              <House />
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link href="/blog" className="sidebar-link" onClick={close}>
              <SquarePen />
              <p>Our Blog</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default SideMenu
