'use client'
import { ChevronDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import "../../styles/dropdownmodal.css"
import { useDropdownModal } from '@/hooks/DropdownModalContext';
import { CommunityGetAll } from '@/types/community';
import { useSession } from 'next-auth/react';
import { findAllCommunity } from '@/server/community';

const DropdownModal = () => {
  const { isOpen, toggle, close, setSelectedCommunity, selectedCommunity } = useDropdownModal();

  const [community, setCommunity] = useState<CommunityGetAll[]>([])

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
    <div>
      <div className="dropdownmodal">
        <div className='dropdownmodal-container' onClick={toggle}>
          {
            selectedCommunity.communityname ? (
              <p>{selectedCommunity.communityname}</p>
            ) : (
              <p>Community</p>
            )
          }
          <ChevronDown className='dropdownmodal-chevron' />
        </div>

        <div className={`dropdownmodal-menu ${isOpen ? 'show' : ''}`}>
          {community.map((item) => {
          const isSelected = selectedCommunity.id === item.id;
            return (
              <a
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCommunity({
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
    </div>
  )
}

export default DropdownModal