import { IApi } from '@/types/api';
import { IApiProfile } from '@/types/api/profile';
import axios, { AxiosResponse } from 'axios';
import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { cookies } from 'next/headers'


export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
  
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_APP_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET as string,
      authorization:{
        params:{
          scope: 'repo read:user user:email'
        }
      }
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async signIn({ user, account }) {
      const userProfile:AxiosResponse<IApi<IApiProfile>> = await axios.get(`http://localhost:8000/v1/github-auth`,{
        headers:{
          Authorization: 'Bearer ' + account?.access_token
        }
      })
      const {accessToken, refreshToken} = userProfile.data.data

      if(account){
        cookies().set('accessToken',accessToken)
        cookies().set('refreshToken',refreshToken)
        account.api_token ={
          access_token:accessToken,
          refresh_token: refreshToken
        }
      }
      return true;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin

      if (account) {
        token.oauthAccessToken = account.access_token
        token.accessToken = account.api_token.access_token
        token.refrehToken = account.api_token.refresh_token
      }
      
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      
      session.oauthAccessToken = token.oauthAccessToken as string
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refrehToken as string
        return session
      }
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out"
  }
  
};