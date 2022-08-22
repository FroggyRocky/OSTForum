export interface IUserLogin {
    login:string,
    password:string
}

interface Keys {
    id:number,
    name:string
}
interface Categories {
    id:number,
    name:string
}

export interface IConfigs {
    categories:Array<Categories>,
    keys:Array<Keys>
}