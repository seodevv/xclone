import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { AdvancedUser } from '@/model/User';
import { NextAuthOptions } from 'next-auth';
import { settingCookies } from '@/app/_lib/cookies';

const authOptions: NextAuthOptions = {
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
        const response = await fetch(`/api/v1/login/oauth`, {
          method: 'post',
          body: formData,
          credentials: 'include',
        });

        if (!response.ok) return false;

        settingCookies(response);
      }
      return true;
    },
    async jwt({ token, user, account, profile, session, trigger }) {
      if (account && ['google', 'github'].includes(account.provider)) {
        token.email = user.id;
      }
      if (trigger === 'update' && session !== null) {
        const { name, image } = session as { name: string; image: string };
        token.name = name;
        token.picture = image;
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
        token: { label: 'token', type: 'text' },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const { id, password, token } = credentials;

        const formData = new FormData();
        const isToken = typeof token !== 'undefined';
        if (isToken) {
          formData.append('token', token);
        } else {
          formData.append('id', id);
          formData.append('password', password);
        }

        let requestUrl = `/api/v1/login`;
        if (isToken) {
          requestUrl += '/token';
        }
        const requestOptions: RequestInit = {
          method: 'POST',
          body: formData,
          credentials: 'include',
        };
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
      },
    }),
  ],
};

export default authOptions;
