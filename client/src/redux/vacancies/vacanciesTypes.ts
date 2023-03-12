export interface IVacancy {
    id:number,
    header:string
    description:string
    cover:string
    link:string
    price:number
    keyIds:number[]
    createdAt:string
}
export interface ICreatedVacancy {
    header:string
    description:string
    cover:string
    link:string
    keyIds:number[]
    price:number
}