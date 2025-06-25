import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/auth`, {
          username: credentials?.username
        }, {
          headers: { "Content-Type": "application/json" },
        });

        const data = res.data;
        console.log("Response from API:", data);

        if (data) {
          console.log(data);
          return data
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // เพิ่มข้อมูลผู้ใช้ลงใน token
      if (user) {
        token.user = JSON.stringify(user);
      }
      return token;
    },
    async session({ session, token }) {
      // เพิ่มข้อมูล token ลงใน session
      if (token?.user) {
        session.user = JSON.parse(token.user as string);
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth'
  },
})

export { handler as GET, handler as POST }