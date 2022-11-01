export interface IUserLogin {
    login:string,
    password:string
}

interface Categories {
    id:number,
    name:string
}

export interface IConfigs {
    categories:Array<Categories>,
}