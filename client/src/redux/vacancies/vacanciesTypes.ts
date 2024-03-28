export interface IVacancyData {
    about:string
    hiring:string,
    responsibilities:string,
    offer:string
    requirements:string
    info:string
}

export interface IVacancy {
    id:number,
    header:string
    description:string
    cover:string
    company:string
    keyIds:number[]
    createdAt:string
    data:IVacancyData
}

export interface ICreatedVacancy {
    header:string
    description:string
    company:string
    cover:string
    keyIds:number[],
    data:{
        about:string
        hiring:string
        offer:string
        responsibilities:string
        requirements:string
        info:string

    }

}