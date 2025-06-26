'use client'
import { ChevronDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import "../../styles/dropdown.css"
import { useDropdown } from '@/hooks/DropdownContext';
import { CommunityGetAll } from '@/types/community';
import { useSession } from 'next-auth/react';
import { findAllCommunity } from '@/server/community';
import { usePostAction } from '@/hooks/PostActionContext';

const Dropdown = () => {
  const { isOpen, toggle, close } = useDropdown();

  const [community, setCommunity] = useState<CommunityGetAll[]>([])
  const { filterCommunity, setFilterCommunity } = useDropdown()

  const { handleFilterPost } = usePostAction()

  const { data: session } = useSession();
  useEffect(() => { 
    fetchDataCommunity()
  }, [session])
  useEffect(() => {
    if (filterCommunity !== null) {
      handleFilterPost()
    }
  }, [filterCommunity])

  console.log(filterCommunity);
  
  
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
        {
          filterCommunity.communityname ? (
            <p>{filterCommunity.communityname}</p>
          ) : (
            <p>Community</p>
          )
        }
        <ChevronDown className='dropdownmodal-chevron' />
      </div>

      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        {community.map((item) => {
          const isSelected = filterCommunity.id === item.id;

          return (
            <a
              key={item.id}
              onClick={(e) => {
                e.preventDefault();
                setFilterCommunity({
                  id: item.id,
                  communityname: item.communityname,
                });
                close();
              }}
              style={isSelected ? { background: '#D8E9E4' } : undefined}
            >
              {item.communityname}
            </a>
          );
        })}

      </div>
    </div>
  )
}

export default Dropdown