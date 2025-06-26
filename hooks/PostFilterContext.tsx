'use client';
import { FilterSend } from '@/types/filter';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type PostFilterContextType = {
  filter: FilterSend;
  setFilter: React.Dispatch<React.SetStateAction<FilterSend>>;
};

const PostFilterContext = createContext<PostFilterContextType | undefined>(undefined);

export const PostFilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<FilterSend>({
    search: '',
    find: ''
  });

  return (
    <PostFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </PostFilterContext.Provider>
  );
};

export const usePostFilterModal = () => {
  const context = useContext(PostFilterContext);
  if (!context) throw new Error("usePostFilterModal must be used within a PostFilterProvider");
  return context;
};
