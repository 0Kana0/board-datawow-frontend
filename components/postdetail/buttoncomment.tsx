"use client"
import React, { useState } from 'react'
import "../../styles/comment.css"
import { CommentSend } from '@/types/comment';
import { useCommentAction } from '@/hooks/CommentActionContext';
import { useSession } from 'next-auth/react';
import { useCommentModal } from '@/hooks/CommentModalContext';

const ButtonComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const { isCommentOpen, closeCommentModal, commentInfo, setCommentInfo } = useCommentModal();

  const { handleSaveComment } = useCommentAction();
  const { data: session } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setCommentInfo({
      ...commentInfo,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className="blogbutton">
      {!isCommenting ? (
        <button className="comment-button" onClick={() => setIsCommenting(true)}>
          Add Comment
        </button>
      ) : (
        <>
        <div className="comment-area">
          <textarea
            className="comment-textarea"
            name="content"
            value={commentInfo.content}
            onChange={handleChange}
            placeholder="What's on your mind..."
          />
        </div>
        <div className="comment-submit">
          <button className="button comment-cancel" onClick={() => {
            setIsCommenting(false),
            setCommentInfo({
              content: '',
              postId: 0,
            });
          }}>
            Cancel
          </button>
          <button className="button comment-success" onClick={()=>handleSaveComment()}>
            Post
          </button>
        </div></>
      )}
    </div>
  );
}

export default ButtonComment