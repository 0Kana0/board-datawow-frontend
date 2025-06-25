import { PostSend } from "@/types/post"
import axios from "axios"

export const findAllPost = async (token: string, params?: {

}) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/post`,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   params: params,
    // }
  );
  return response.data;
};

export const findAllPostByUser = async (token: string, id: number,  params?: {

}) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/post/byuser/`+id,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   params: params,
    // }
  );
  return response.data;
};

export const findOnePost = async (token: string, id: number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/post/`+id, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }
  )
  return response.data
}

export const createPost = async (token: string, data: PostSend) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/post`, data, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }
  )
  return response.data
}

export const updatePost = async (token: string, data: PostSend, id: number) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/post/`+id, data, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }
  )
  return response.data
}

export const deletePost = async (token: string, id: number) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/post/`+id, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }
  )
  return response.data
}