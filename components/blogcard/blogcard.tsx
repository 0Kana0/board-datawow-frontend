import React from 'react'
import "../../styles/blogcard.css"
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { PostGetAll } from '@/types/post'

type BlogCardProps = {
  post: PostGetAll
}

const BlogCard: React.FC<BlogCardProps> = ({post}) => {
  return (
    <div className='blogcard-container'>
      <div className="blogcard-info">
        <div className="blogcard-profile">
          <Image
            src="/67da9fddd372b1b5b44ffef41eed6ceb810ddf8a.jpg"
            alt='profile image'
            width={30}
            height={30}
            className='blogcard-img'
          />
          <p>{post.user.username}</p>
        </div>
        <div className="blogcard-community">
          <p>{post.community.communityname}</p>
        </div>
      </div>
      <div className="blogcard-detail">
        <div className="blogcard-post">
          <p className="blogcard-title">{post.title}</p>
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

export default BlogCard