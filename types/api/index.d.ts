import { IApiProfile } from "./profile"

export interface IApi<T = void>{
    message: string,
    status: number,
    data?: T,
    page?: number,
    limit?: number,
    itemCount?: number,
    hasNextPage?: boolean
}

export interface IApiLanding{
    profile: IApiProfile
}