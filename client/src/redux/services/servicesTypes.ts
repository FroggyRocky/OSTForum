export interface IService {
    id:number,
    header:string
    description:string
    cover:string
    link:string
    keyIds:number[]
    createdAt:string,
    score?:number | null
}
export interface ICreatedService {
    header:string
    description:string
    cover:string
    link:string
    keyIds:number[]
}