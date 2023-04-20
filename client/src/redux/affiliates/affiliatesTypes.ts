import {IKey} from "../auth/authConfigsTypes";

export interface IAffiliate {
    id:number,
header:string
    description:string
    cover:string
    link:string
    keyIds:number[]
    createdAt:string,
    score:number | null
}

export interface ICreatedAffiliate {
    header:string
    description:string
    cover:string
    link:string
    keyIds:number[] | []
    score:number | 0
}