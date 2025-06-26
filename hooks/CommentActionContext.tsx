'use client'
import React, { createContext, useContext } from 'react';

type CommentActionContextType = {
  handleSaveComment: () => void;
};

const CommentActionContext = createContext<CommentActionContextType | undefined>(undefined);

export const useCommentAction = () => {
  const context = useContext(CommentActionContext);
  if (!context) {
    throw new Error('useCommentAction must be used within a CommentActionProvider');
  }
  return context;
};

export const CommentActionProvider = ({
  children,
  handleSaveComment,
}: {
  children: React.ReactNode;
  handleSaveComment: () => void;
}) => {
  return (
    <CommentActionContext.Provider value={{ handleSaveComment }}>
      {children}
    </CommentActionContext.Provider>
  );
};
