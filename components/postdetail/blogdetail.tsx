"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { PostGetAll } from '@/types/post';
import { findOnePost } from '@/server/post';
import { MessageCircle } from 'lucide-react';
import "../../styles/blogdetail.css"
import ButtonComment from './buttoncomment';

type BlogDetaiProps = {
  post: PostGetAll
}

const BlogDetail: React.FC<BlogDetaiProps> = ({post}) => {
  
  return (
    <div className='.blogcard-detail-container'>
      <div className="blogcard-detail-info">
        <div className="blogcard-detail-profile">
          <Image
            src="/67da9fddd372b1b5b44ffef41eed6ceb810ddf8a.jpg"
            alt='profile image'
            width={48}
            height={48}
            className='blogcard-detail-img'
          />
          <p>{post?.user.username}</p>
        </div>
        <div className="blogcard-detail-community">
          <p>{post.community.communityname}</p>
        </div>
      </div>
      <div className="blogcard-detail-detail">
        <div className="blogcard-detail-post">
          <p className="blogcard-detail-title">{post.title}</p>
          <p className="blogcard-detail-content">{post.content}</p>
        </div>
        <div className='blogcard-detail-comment'>
          <MessageCircle className='blogcard-detail-circle' />
          <p>Comments</p>
        </div>
      </div>
      <ButtonComment />
    </div>
  )
}

export default BlogDetail