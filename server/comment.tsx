import { CommentSend } from "@/types/comment";
import axios from "axios"

export const findAllCommentByPost = async (token: string, postId: number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/comment/bypost/`+ postId,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   params: params,
    // }
  );
  return response.data;
};

export const createComment = async (token: string, data: CommentSend) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/comment`, data
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   params: params,
    // }
  );
  return response.data;
};