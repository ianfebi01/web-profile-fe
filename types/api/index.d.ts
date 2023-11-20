export interface IApi<T>{
    message: string,
    status: number,
    data: T
}