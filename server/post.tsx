import { PostSend } from "@/types/post"
import axios from "axios"

export const findAllPost = async (
  token: string,
  params?: {
    search?: string;
    find?: number;
  }
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/post`,
      {
        // ถ้าคุณเปิด auth ค่อยใส่ header นี้
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        params: params,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || 'Axios error occurred';

      console.error(`Error [${status}]:`, message);

      // ส่งต่อ error ให้ frontend ไป handle ต่อ เช่น toast
      throw new Error(
        typeof message === 'string' ? message : Array.isArray(message) ? message[0] : 'Unknown error'
      );
    } else {
      console.error('Unexpected Error:', error);
      throw new Error('Unexpected error occurred');
    }
  }
};


export const findAllPostByUser = async (token: string, id: number,  params?: {
  search?: string;
  find?: number;
}) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/post/byuser/`+id,
      {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
        params: params,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || 'Axios error occurred';

      console.error(`Error [${status}]:`, message);

      // ส่งต่อ error ให้ frontend ไป handle ต่อ เช่น toast
      throw new Error(
        typeof message === 'string' ? message : Array.isArray(message) ? message[0] : 'Unknown error'
      );
    } else {
      console.error('Unexpected Error:', error);
      throw new Error('Unexpected error occurred');
    }
  }
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