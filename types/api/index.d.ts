import { IApiProfile } from "./profile"

export interface IApi<T = void>{
    message: string,
    status: number,
    data?: T
}

export interface IApiLanding{
    profile: IApiProfile
}