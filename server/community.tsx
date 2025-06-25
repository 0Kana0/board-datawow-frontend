import axios from "axios"

export const findAllCommunity = async (token: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/community`,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   params: params,
    // }
  );
  return response.data;
};