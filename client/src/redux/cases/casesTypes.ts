export interface ICase {
    id:number,
    header:string
    description:string,
    text:string
    cover:string
    keyIds:number[]
    createdAt:string
    link:string
}
export interface ICreatedCase {
    header:string
    description:string
    cover:string
    link:string
    keyIds:number[]
}
