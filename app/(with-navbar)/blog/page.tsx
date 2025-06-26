"use client"
import BlogCardUser from '@/components/blogcard/blogcarduser';
import BlogHeader from '@/components/blogheader/blogheader'
import DeleteModal from '@/components/modal/deletemodal';
import PostModal from '@/components/modal/postmodal';
import { useDeleteModal } from '@/hooks/DeleteModalContext';
import { useDropdown } from '@/hooks/DropdownContext';
import { useDropdownModal } from '@/hooks/DropdownModalContext';
import { useModal } from '@/hooks/ModalContext';
import { PostActionProvider } from '@/hooks/PostActionContext';
import { createPost, deletePost, findAllPost, findAllPostByUser, updatePost } from '@/server/post';
import { PostGetAll } from '@/types/post';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const BlogPage = () => {
  const [post, setPost] = useState<PostGetAll[]>([])

  const { closeModal, postInfo, setPostInfo, mode, editingId } = useModal();
  const { closeDeleteModal, postId } = useDeleteModal();

  const { close, selectedCommunity } = useDropdownModal();
  const { filterCommunity } = useDropdown();

  const { data: session } = useSession();

  useEffect(() => {
    fetchDataPost()
  }, [session])

  const fetchDataPost = async () => {
    try {
      if (session) {
        const token = session?.user?.id
        console.log(token);
        console.log(filterCommunity.id);
        
        
        if (!token) {
          throw new Error("Token is undefined");
        }
        const data = await findAllPostByUser(token, Number(session?.user?.id), {
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

      if (mode == 'add') {
        const result = {
          ...postInfo,
          userId: Number(session?.user?.id),
          communityId: selectedCommunity.id,
        };

        const data = await createPost('dasdad', result);
        console.log("ข้อมูลที่ได้:", data);
      } else if (mode == 'edit') {
        if (!editingId) {
          throw new Error("editingId is undefined");
        }

        const result = {
          ...postInfo,
          userId: Number(session?.user?.id),
          communityId: selectedCommunity.id,
        };

        const data = await updatePost('dasdad', result, editingId);
        console.log("ข้อมูลที่ได้:", data);
      }

      setPostInfo ({
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
    if (!postId) {
      throw new Error("postId is undefined");
    }
    const data = await deletePost('dasdad', Number(postId));
    console.log("ข้อมูลที่ได้:", data);

    fetchDataPost()
    closeDeleteModal();
    close();
  }

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
              <BlogCardUser key={item.id} post={item} />
            ))
          ) : (
            <p>ไม่มีข้อมูล</p>
          )
        }
      </div>
      <DeleteModal />
    </PostActionProvider>
  )
}

export default BlogPage