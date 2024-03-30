export interface IApiPortofolio {
  id: number
  name: string
  description: string
  image: string
  year: Date
  userId: number
  skill?: string[]
}
