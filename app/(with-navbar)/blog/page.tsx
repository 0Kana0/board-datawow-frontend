"use client"
import BlogCardUser from '@/components/blogcard/blogcarduser';
import BlogHeader from '@/components/blogheader/blogheader'
import DeleteModal from '@/components/modal/deletemodal';
import PostModal from '@/components/modal/postmodal';
import { useDeleteModal } from '@/hooks/DeleteModalContext';
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

  const { data: session } = useSession();

  useEffect(() => {
    fetchDataPost()
  }, [session])

  const fetchDataPost = async () => {
    try {
      if (session) {
        const token = session?.user?.id
        console.log(token);
        
        if (!token) {
          throw new Error("Token is undefined");
        }
        const data = await findAllPostByUser(token, Number(session?.user?.id), {
          // skip: 0,
          // take: 10,
          // search: "โต",
          // sort: "id",
          // order: "asc",
          // filter: "nozero"
        })
        console.log("ข้อมูลที่ได้:", data)
        setPost(data)
      } 
        
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะดึงข้อมูล:", error)
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
          communityId: selectedCommunity,
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
          communityId: selectedCommunity,
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

  return (
    <PostActionProvider 
      handleSavePost={handleSavePost} 
      handleDeletePost={handleDeletePost}
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