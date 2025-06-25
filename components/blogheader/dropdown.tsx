'use client'
import { ChevronDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import "../../styles/dropdown.css"
import { useDropdown } from '@/hooks/DropdownContext';
import { CommunityGetAll } from '@/types/community';
import { useSession } from 'next-auth/react';
import { findAllCommunity } from '@/server/community';

const Dropdown = () => {
  const { isOpen, toggle, close } = useDropdown();

  const [community, setCommunity] = useState<CommunityGetAll[]>([])
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(null)

  const { data: session } = useSession();
  useEffect(() => {
    fetchDataCommunity()
  }, [session])
  
  const fetchDataCommunity = async () => {
    try {
      if (session) {
        const token = session?.user?.id
        console.log(token);
          
        if (!token) {
          throw new Error("Token is undefined");
        }
        const data = await findAllCommunity(token)
        console.log("ข้อมูลที่ได้:", data)
        setCommunity(data)
      } 
          
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะดึงข้อมูล:", error)
    }
  }

  return (
    <div className="dropdown">
      <div className='dropdown-container' onClick={toggle}>
        <p>Community</p>
        <ChevronDown className='dropdownmodal-chevron' />
      </div>

      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        {community.map((item) => (
          <a
            key={item.id}
            onClick={(e) => {
              e.preventDefault()
              setSelectedCommunity(item.id)
              close()
            }}
          >
            {item.communityname}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Dropdown