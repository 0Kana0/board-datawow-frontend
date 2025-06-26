"use client"
import BlogCard from '@/components/blogcard/blogcard'
import BlogHeader from '@/components/blogheader/blogheader'
import PostModal from '@/components/modal/postmodal';
import { useDropdown } from '@/hooks/DropdownContext';
import { useDropdownModal } from '@/hooks/DropdownModalContext';
import { useModal } from '@/hooks/ModalContext';
import { PostActionProvider } from '@/hooks/PostActionContext';
import { usePostFilterModal } from '@/hooks/PostFilterContext';
import { createPost, findAllPost } from '@/server/post';
import { PostGetAll } from '@/types/post';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const PostPage = () => {
  const [post, setPost] = useState<PostGetAll[]>([])

  const { filter } = usePostFilterModal()
  const { closeModal, postInfo, setPostInfo } = useModal();
  const { close, selectedCommunity } = useDropdownModal();
  const { filterCommunity } = useDropdown();

  const { data: session } = useSession();

  useEffect(() => {
    fetchDataPost()
  }, [session])

  console.log(filter);
  

  const fetchDataPost = async () => {
    try {
      if (session) {
        const token = session?.user?.id
        
        if (!token) {
          throw new Error("Token is undefined");
        }
        const data = await findAllPost(token,{
          find: Number(filterCommunity.id)
        })
        console.log("ข้อมูลที่ได้:", data)
        setPost(data)
      } 
        
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะดึงข้อมูล:", error)
      setPost([])
    }
  }

  // **************************************************

  const handleSavePost = async () => {
    try {
      if (!session?.user?.id) {
        throw new Error("userId is undefined");
      }
      if (!selectedCommunity) {
        throw new Error("communityId is undefined");
      }

      const result = {
        ...postInfo,
        userId: Number(session?.user?.id),
        communityId: selectedCommunity.id,
      };

      const data = await createPost('dasdad', result);
      console.log("ข้อมูลที่ได้:", data);

      setPostInfo({
        "title": '',
        "content": '',
        "communityId": 0,
        "userId": 0,
      })
      fetchDataPost()
      closeModal();
      close();
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
    }
  };
  
  const handleDeletePost = async () => {
    
  };

  const handleFilterPost = async () => {
    fetchDataPost()
  }

  return (
    <PostActionProvider 
      handleSavePost={handleSavePost} 
      handleDeletePost={handleDeletePost}
      handleFilterPost={handleFilterPost}
    >
      <div>
        <BlogHeader />
        <PostModal />
        {
          Array.isArray(post) && post.length > 0 ? (
            post.map((item) => (
              <Link key={item.id} href={`/${item.id}`}>
                <BlogCard post={item} />
              </Link>
            ))
          ) : (
            <p>ไม่มีข้อมูล</p>
          )
        }
      </div>
    </PostActionProvider>
  )
}

export default PostPage