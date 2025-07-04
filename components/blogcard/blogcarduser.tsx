'use client';
import React from 'react'
import "../../styles/blogcard.css"
import { MessageCircle, PenLine, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { PostGetAll } from '@/types/post'
import ConfirmDeleteModal from '../modal/deletemodal'
import { useDeleteModal } from '@/hooks/DeleteModalContext';
import { useModal } from '@/hooks/ModalContext';
import { usePostFilterModal } from '@/hooks/PostFilterContext';

type BlogCardProps = {
  post: PostGetAll;
  searchTerm?: string;
};


const BlogCardUser: React.FC<BlogCardProps> = ({post, searchTerm = '' }) => {
  const { openDeleteModal } = useDeleteModal();
  const { openModal } = useModal();

  const { filter } = usePostFilterModal()
    
  const highlightText = (text: string, keyword: string) => {
    if (!keyword) return text;
    if (keyword.length < 2) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: '#C5A365'}}>{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className='blogcard-container'>
      <div className="blogcard-info">
        <div className="blogcarduser-profile">
          <div className="blogcarduser-user">
            <Image
              src="/67da9fddd372b1b5b44ffef41eed6ceb810ddf8a.jpg"
              alt='profile image'
              width={30}
              height={30}
              className='blogcard-img'
            />
            <p>{post.user.username}</p>
          </div>
          <div className="blogcarduser-actions">
            <PenLine 
              width={16} 
              height={16} 
              className='blogcarduser-edit' 
              onClick={() => openModal('edit', {
                title: post.title,
                content: post.content,
                communityId: post.community.id,
                userId: post.user.id,
              }, post.id)}
            />
            <Trash2 
              width={16} 
              height={16} 
              className='blogcarduser-delete' 
              onClick={() => openDeleteModal(String(post.id))} 
            />
          </div>
        </div>
        <div className="blogcard-community">
          <p>{post.community.communityname}</p>
        </div>
      </div>
      <div className="blogcard-detail">
        <div className="blogcard-post">
          <p className="blogcard-title">{highlightText(post.title, filter.search)}</p>
          <p className="blogcard-content">{post.content}</p>
        </div>
        <div className='blogcard-comment'>
          <MessageCircle className='blogcard-circle' />
          <p>Comments</p>
        </div>
      </div>
    </div>
  )
}

export default BlogCardUser