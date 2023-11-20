export interface IApiProfile{
        id: number
        email: string
        name: string
        avatar: string
        quote?: string | null
        positionId?: string | null
        accessToken: string
        refreshToken: string
}