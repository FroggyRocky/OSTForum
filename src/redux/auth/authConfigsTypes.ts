export interface IUserLogin {
    login:string,
    password:string
}

export interface ICategory {
    id:number,
    name:string
}

export interface IConfigs {
    categories:Array<ICategory>,
}