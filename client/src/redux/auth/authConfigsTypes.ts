export interface IUserLogin {
    login:string,
    password:string
}
export enum CategoryEnum {
    instagram = 1,
    facebook,
    crypto,
    affiliate,
    cases,
    ecommerce,
    tikTok

}
export interface ICategory {
    id:number,
    name:string
}
export interface IKey {
    id:number,
    name:string
}
export interface IConfigs {
    categories:Array<ICategory>,
    keys:{
        affiliate:Array<IKey>,
        case: Array<IKey>,
        network: Array<IKey>,
        service: Array<IKey>,
        vacancy:Array<IKey>
    }
}