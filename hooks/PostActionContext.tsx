'use client'
import React, { createContext, useContext } from 'react';

type PostActionContextType = {
  handleSavePost: () => void;
  handleDeletePost: () => void;
};

const PostActionContext = createContext<PostActionContextType | undefined>(undefined);

export const usePostAction = () => {
  const context = useContext(PostActionContext);
  if (!context) {
    throw new Error('usePostAction must be used within a PostActionProvider');
  }
  return context;
};

export const PostActionProvider = ({
  children,
  handleSavePost,
  handleDeletePost
}: {
  children: React.ReactNode;
  handleSavePost: () => void;
  handleDeletePost: () => void;
}) => {
  return (
    <PostActionContext.Provider value={{ handleSavePost, handleDeletePost }}>
      {children}
    </PostActionContext.Provider>
  );
};
