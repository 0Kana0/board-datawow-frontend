'use client';
import { useModal } from '@/hooks/ModalContext';
import React from 'react'
import PostModal from '../modal/postmodal';


const CreateButton = () => {
  const { openModal } = useModal();

  return (
    <div>
      <div>
        <button
          className='button'
          onClick={() => openModal("add")}
        >
          Create +
        </button>
        <PostModal />
      </div>
    </div>
  )
}

export default CreateButton