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

const PostDetailPage = () => {
  const [post, setPost] = useState<PostGetAll | null>(null);
  const params = useParams();
  const id = params.id as string;

  const { data: session } = useSession();
  useEffect(() => {
    fetchDataPostOne()
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

  return (
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
      <CommentDetail />
    </div>
  )
}

export default PostDetailPage