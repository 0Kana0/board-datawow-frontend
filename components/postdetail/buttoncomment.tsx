"use client"
import React, { useState } from 'react'
import "../../styles/comment.css"

const ButtonComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState('');

  return (
    <div className="blogbutton">
      {!isCommenting ? (
        <button className="comment-button" onClick={() => setIsCommenting(true)}>
          Add Comment
        </button>
      ) : (
        <div className="comment-area">
          <textarea
            className="comment-textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What's on your mind..."
          />
          <div className="comment-submit">
            
          </div>
        </div>
      )}
    </div>
  );
}

export default ButtonComment