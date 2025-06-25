'use client';
import { PostSend } from '@/types/post';
import React, { createContext, useContext, useState } from 'react';

type ModalContextType = {
  isOpen: boolean;
  openModal: (mode?: 'add' | 'edit', post?: PostSend, id?: number) => void;
  closeModal: () => void;
  postInfo: PostSend;
  setPostInfo: React.Dispatch<React.SetStateAction<PostSend>>;
  mode: 'add' | 'edit';
  editingId: number | null;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [postInfo, setPostInfo] = useState<PostSend>({
    title: '',
    content: '',
    communityId: 0,
    userId: 0,
  });

  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<number | null>(null);

  const openModal = (newMode: 'add' | 'edit' = 'add', post?: PostSend, id?: number) => {
    setMode(newMode);
    if (newMode === 'edit' && post) {
      setPostInfo(post);
      setEditingId(id ?? null);
    } else {
      setPostInfo({
        title: '',
        content: '',
        communityId: 0,
        userId: 0,
      });
      setEditingId(null);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingId(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        postInfo,
        setPostInfo,
        mode,
        editingId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
