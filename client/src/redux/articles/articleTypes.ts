import {IUser} from "../user/userType";
import {ContentBlock} from "draft-js";



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
    previewDescription: string,
    description: string,
    coverImg_withText: string,
    coverImg_withOutText: string,
    keys: Array<string>,
    usersLiked: Array<number>
    usersDisliked: Array<number>
    usersViewed: Array<number>
    createdAt: string,
    comments: Array<IComments>,
    categoryIds: Array<number> | null
}

export interface IArticle extends IArticlesPreview {
    text: string,
    user: IUser,
}

export interface ICreatedArticle {
    header: string,
    description: string,
    previewDescription: string,
    coverImg_withText: string,
    text: string,
    categoryIds: Array<number> | null
}

export interface IEditingArticle {
    editorState: {
        contentBlocks: ContentBlock[],
        entityMap: any
    },
    articleId:number,
    header:string,
    description:string,
    previewDescription:string,
    coverImg_withText:string,
    coverImg_withOutText:string,
    categoryIds:Array<number> | null
}

export interface IUpdateArticle extends ICreatedArticle {
    articleId:number
}
