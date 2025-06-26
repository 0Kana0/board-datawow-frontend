import React from 'react'
import "../../styles/comment.css"
import { User } from 'lucide-react'
import { CommentGetAll } from '@/types/comment'

type CommentProps = {
  comment: CommentGetAll
}

const CommentDetail: React.FC<CommentProps> = ({comment}) => {
  return (
    <div className='comment-component'>
      <div className="comment-detail">
        <div className="comment-profile-detail">
          <div className="comment-image">
            <User width={24} height={24} />
          </div>
          <p className="comment-profile-name">Wittawat98</p>
          <p className="comment-profile-date">{comment.createdAt}</p>
        </div>
        <div className="comment-content">
          <p>
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CommentDetail