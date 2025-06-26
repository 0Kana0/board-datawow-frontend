"use client"
import BlogDetail from '@/components/postdetail/blogdetail'
import CommentDetail from '@/components/postdetail/commentdetail'
import { ArrowLeft } from 'lucide-react'
import "../../../styles/postdetail.css"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { PostGetAll } from '@/types/post';
import { findOnePost } from '@/server/post';
import { useParams } from 'next/navigation';
import { createComment, findAllCommentByPost } from '@/server/comment'
import { CommentGetAll } from '@/types/comment'
import { useCommentModal } from '@/hooks/CommentModalContext'
import { CommentActionProvider } from '@/hooks/CommentActionContext'

const PostDetailPage = () => {
  const [post, setPost] = useState<PostGetAll | null>(null);
  const [comment, setComment] = useState<CommentGetAll[]>([])
  const { commentInfo, closeCommentModal } = useCommentModal()
  const params = useParams();
  const id = params.id as string;

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchDataPostOne()
      fetchDataCommentByPost()
    }
  }, [session])
  
  const fetchDataPostOne = async () => {
    try {
      if (session) {
        const token = session?.user?.id
        console.log(token);
                
        if (!token) {
          throw new Error("Token is undefined");
        }
        const data = await findOnePost(token, Number(id))
        console.log("ข้อมูลที่ได้:", data)
        setPost(data)
      }      
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะดึงข้อมูล:", error)
    }
  }
  const fetchDataCommentByPost = async () => {
    try {
      if (session) {
        const token = session?.user?.id
        console.log(token);
                
        if (!token) {
          throw new Error("Token is undefined");
        }

        const data = await findAllCommentByPost(token, Number(id))
        console.log("ข้อมูลที่ได้:", data)
        setComment(data)
      }      
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะดึงข้อมูล:", error)
    }
  }

  // **********************************************************************

  const handleSaveComment = async () => {
    try {
      if (!session?.user?.id) {
        throw new Error("userId is undefined");
      }
      if (!post?.id) {
        throw new Error("postId is undefined");
      }
    
      const result = {
        ...commentInfo,
        postId: post?.id,
      };

      console.log(result);
      
    
      const data = await createComment('dasdad', result);
      console.log("ข้อมูลที่ได้:", data);
    
      
      fetchDataCommentByPost()
      closeCommentModal()
      } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
      }
  }

  return (
    <CommentActionProvider
      handleSaveComment={handleSaveComment}
    >
      <div className='postdetail-container'>
        <Link href={"/"} className="postdetail-back">
          <ArrowLeft width={24} height={24} />
        </Link>
        {
          post? (
            <BlogDetail post={post} />
          ) : (
            <p>ไม่มีข้อมูล</p>
          )
        }
        {
          Array.isArray(comment) && comment.length > 0 ? (
            comment.map((item) => (
              <CommentDetail key={item.id} comment={item} />
            ))
          ) : (
            <p>ไม่มีข้อมูล</p>
          )
        }
      </div>
    </CommentActionProvider>
  )
}

export default PostDetailPage