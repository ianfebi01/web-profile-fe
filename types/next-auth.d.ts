import NextAuth from "next-auth"
import { IApiProfile } from "./api/profile"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {

      /** Access Token. */
      accessToken: string,
      refreshToken: string,
      oauthAccessToken: string

  }
  interface Account {
      /** Access Token. */
      api_token:{
        access_token?: string,
        refresh_token?: string
      }
  }
}