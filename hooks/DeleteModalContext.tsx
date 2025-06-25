'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type DeleteModalContextType = {
  isDeleteOpen: boolean;
  postId: string | null;
  openDeleteModal: (id: string) => void;
  closeDeleteModal: () => void;
};

const DeleteModalContext = createContext<DeleteModalContextType | undefined>(undefined);

export const DeleteModalProvider = ({ children }: { children: ReactNode }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);

  const openDeleteModal = (id: string) => {
    setPostId(id);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setPostId(null);
  };

  return (
    <DeleteModalContext.Provider value={{ isDeleteOpen, postId, openDeleteModal, closeDeleteModal }}>
      {children}
    </DeleteModalContext.Provider>
  );
};

export const useDeleteModal = () => {
  const context = useContext(DeleteModalContext);
  if (!context) throw new Error("useDeleteModal must be used within a DeleteModalProvider");
  return context;
};
