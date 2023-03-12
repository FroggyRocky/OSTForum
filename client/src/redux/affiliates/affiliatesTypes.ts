
export interface IAffiliate {
    id:number,
header:string
    description:string
    cover:string
    link:string
    price:number
    keyIds:number[]
    createdAt:string
}

export interface ICreatedAffiliate {
    header:string
    description:string
    cover:string
    link:string
    price:number
    keyIds:number[] | []
}