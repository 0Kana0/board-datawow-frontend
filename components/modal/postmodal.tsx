'use client'
import { useModal } from '@/hooks/ModalContext';
import React, { useState } from 'react'
import "../../styles/modal.css"
import DropdownModal from './dropdownmodal';
import { X } from 'lucide-react';
import { useDropdownModal } from '@/hooks/DropdownModalContext';
import { useSession } from 'next-auth/react';
import { createPost } from '@/server/post';
import { usePostAction } from '@/hooks/PostActionContext';

type Props = {
  handleSavePost: () => void;
};

const PostModal = () => {
  const { isOpen, closeModal, postInfo, setPostInfo, mode } = useModal();
  const { close, selectedCommunity } = useDropdownModal();
  const { handleSavePost } = usePostAction();

  const { data: session } = useSession();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // ปิด modal ถ้าคลิกที่พื้นหลัง (overlay)
    closeModal();
    close()
  };
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // กันไม่ให้ event ลอดเข้าไปที่ backdrop
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPostInfo({
      ...postInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`modal-overlay ${isOpen ? 'show' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className="modal-content" onClick={stopPropagation}>
        {
          mode == 'add' ? (
            <p className='modal-p'>Create Post</p>
          ) : (
            <p className='modal-p'>Edit Post</p>
          )
        }
        <p className='modal-x' onClick={() => {closeModal();close();}}><X /></p>
        <div className="modal-post-form">
          <DropdownModal />
          <div className="modal-post-title">
            <input 
              type="text" 
              placeholder='Title' 
              name="title"
              onChange={handleChange}
              value={postInfo.title}
            />
          </div>
          <div className="modal-post-content">
            <textarea 
              placeholder="What's on your mind..." 
              name="content"
              onChange={handleChange}
              value={postInfo.content}
            />
          </div>
        </div>
        <div className="modal-button">
          <button className='button cancel' onClick={() => {closeModal();close();}}>Cancel</button>
          {
            mode == 'add' ? (
              <button className='button' onClick={() => handleSavePost()}>Post</button>
            ) : (
              <button className='button' onClick={() => handleSavePost()}>Confirm</button>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default PostModal