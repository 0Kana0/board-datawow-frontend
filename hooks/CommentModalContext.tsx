'use client';
import { CommentSend } from '@/types/comment';
import { PostSend } from '@/types/post';
import React, { createContext, useContext, useState } from 'react';

type CommentModalContextType = {
  isCommentOpen: boolean;
  openCommentModal: () => void;
  closeCommentModal: () => void;
  commentInfo: CommentSend;
  setCommentInfo: React.Dispatch<React.SetStateAction<CommentSend>>;
};

const CommentModalContext = createContext<CommentModalContextType | undefined>(undefined);

export const CommentModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCommentOpen, setCommentIsOpen] = useState(false);
  const [commentInfo, setCommentInfo] = useState<CommentSend>({
    content: '',
    postId: 0,
  });


  const openCommentModal = () => {
    setCommentInfo({
      content: '',
      postId: 0,
    });
    setCommentIsOpen(true);
  };

  const closeCommentModal = () => {
    setCommentInfo({
      content: '',
      postId: 0,
    });
    setCommentIsOpen(false);
  };

  return (
    <CommentModalContext.Provider
      value={{
        isCommentOpen,
        openCommentModal,
        closeCommentModal,
        commentInfo,
        setCommentInfo,
      }}
    >
      {children}
    </CommentModalContext.Provider>
  );
};

export const useCommentModal = () => {
  const context = useContext(CommentModalContext);
  if (!context) {
    throw new Error('useCommentModal must be used within a ModalProvider');
  }
  return context;
};
