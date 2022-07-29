export interface UserType {
    id:number,
    name:string,
    avatar:string
}
export interface CategoryType {
    id:number,
    name:string
}
export interface CommentsType {
    id:number,
    text:string,
    usersLiked:Array<number>
    usersDisliked:Array<number>
    createdAt:string,
    user:UserType // comment creator
}
export interface ArticlesPreviewType {
    id:number,
    header:string,
    description:string,
    mainImg:string,
    keys:Array<string>,
    usersLiked:Array<number>
    usersDisliked:Array<number>
    usersViewed:Array<number>
    createdAt:string,
    comments:Array<CommentsType>,
    category:CategoryType,
}
export interface ArticleType extends ArticlesPreviewType{
    text:string,
    user:UserType,
}
