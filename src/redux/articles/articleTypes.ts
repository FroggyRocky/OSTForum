import {IUser} from "../user/userType";
import {ContentBlock} from "draft-js";

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
    category: ICategory,
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
    categoryId: number | undefined
}

export interface IEditingArticle {
    editorState: {
        contentBlocks: ContentBlock[],
        entityMap: any
    },
    coverImg_withText:string,
    coverImg_withOutText:string
}
