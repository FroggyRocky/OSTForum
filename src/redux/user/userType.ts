import {IArticlesPreview} from "../articles/articleTypes";


export interface IUser {
    id:number,
    name:string,
    login:string,
    avatar:string,
    articles:IArticlesPreview[]
}