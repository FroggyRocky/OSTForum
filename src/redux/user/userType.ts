
import {ArticlesPreviewType} from "../articles/articleTypes";


export interface UserType {
    id:number,
    name:string,
    login:string,
    avatar:string,
    articles:ArticlesPreviewType[]
}