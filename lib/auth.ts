import { NextAuthOptions, getServerSession } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";

type LoginResponse = {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    image: string;
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { },
        password: {},
      },
      async authorize(credentials) {
        try {
          const res = await axios.post<LoginResponse>(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
            credentials,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          const { name, _id, email, role, image } = res.data.user;
          const user = {
            id: _id,
            name,
            email,
            role,
            image,
            token: res.data.token,
          };
          return user; // User interface we declared in next-auth.d.ts
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data);
          }

          throw new Error("Login Failed")
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return Promise.resolve(token); // JWT interface we declared in next-auth.d.ts
    },
    async session({ session, token }) {
      session.user = token.user;
      return session; // Session interface we declared in next-auth.d.ts
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const getAuthSession = () => getServerSession(authOptions);
