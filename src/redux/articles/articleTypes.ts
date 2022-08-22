import {IUser} from "../user/userType";

export interface ICategory {
    id: number,
    name: string
}

export interface IComments {
    id: number,
    text: string,
    usersLiked: Array<number>
    usersDisliked: Array<number>
    createdAt: string,
    user: IUser // comment creator
}

export interface IArticlesPreview {
    id: number,
    header: string,
    description: string,
    mainImg: string,
    keys: Array<string>,
    usersLiked: Array<number>
    usersDisliked: Array<number>
    usersViewed: Array<number>
    createdAt: string,
    comments: Array<IComments>,
    category: ICategory,
}

export interface IArticle extends IArticlesPreview {
    text: string,
    user: IUser,
}

export interface ICreatedArticle {
    header: string,
    description: string,
    mainImg: string,
    text: string,
    category: string
}
