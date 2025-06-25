// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      token?: string; // 👈 เพิ่ม field ที่คุณใช้
    }
  }

  interface User {
    id: string;
    token?: string;
  }

  interface JWT {
    id: string;
    token?: string;
  }
}
