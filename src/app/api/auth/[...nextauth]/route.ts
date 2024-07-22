import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { AdvancedUser } from '@/model/User';
import { NextAuthOptions } from 'next-auth';
import { settingCookies } from '@/app/_lib/cookies';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  callbacks: {
    async signIn({ credentials, user, email, account, profile }) {
      if (account && ['google', 'github'].includes(account.provider)) {
        if (!user.id || !user.name || !user.image) return false;
        const formData = new FormData();
        formData.append('id', user.id);
        formData.append('nickname', user.name);
        formData.append('image', user.image);
        const response = await fetch(
          `${process.env.SERVER_URL}/api/login/oauth`,
          {
            method: 'post',
            body: formData,
            credentials: 'include',
          }
        );

        if (!response.ok) return false;

        settingCookies(response);
      }
      return true;
    },
    async jwt({ token, user, account, profile, session, trigger }) {
      if (account && ['google', 'github'].includes(account.provider)) {
        token.email = user.id;
      }
      return token;
    },
    async session({ token, session, newSession, user }) {
      return session;
    },
    async redirect({ baseUrl, url }) {
      return url;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        id: { label: 'id', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const { id, password } = credentials;

        const formData = new FormData();
        formData.append('id', id);
        formData.append('password', password);

        const requestUrl = `${process.env.SERVER_URL}/api/login`;
        const requestOptions: RequestInit = {
          method: 'post',
          body: formData,
          credentials: 'include',
        };
        try {
          const response = await fetch(requestUrl, requestOptions);
          if (!response.ok) return null;
          settingCookies(response);

          const user: { data: AdvancedUser; message: string } =
            await response.json();
          return {
            id: user.data.id,
            email: user.data.id,
            name: user.data.nickname,
            image: user.data.image,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
