import {ICategory} from "../redux/auth/authConfigsTypes";
import instFb from '../assets/categoryFlags/instFb.png'
import crypto from '../assets/categoryFlags/crypto.png'
import ecommerce from '../assets/categoryFlags/eCommerce.png'
import cases from '../assets/categoryFlags/cases.png'
import affiliate from '../assets/categoryFlags/affiliate.png'
import tiktok from '../assets/categoryFlags/tikTok.png'

export function filterCategoriesForFlags(categories:ICategory[]) {
    let flags:string[] = []
        if(categories.find(el => el.name === 'instagram') || categories.find(el => el.name === 'facebook')) {
            flags = [...flags,  'inst&fb']
        }
        flags = [...flags, ...categories.filter(category => category.name !== 'facebook' && category.name !== 'instagram').map(el => el.name)]
    return flags
}

export function setPathToFlagImg(flagName: string) {
    switch (flagName) {
        case 'inst&fb':
            return instFb
        case 'crypto':
            return crypto
        case 'e-commerce':
            return ecommerce
        case 'tikTok':
            return tiktok
        case 'affiliate':
            return affiliate
        case 'cases':
            return cases
    }
}


export function findCategoryObjById(categoryIds:number[],categories:ICategory[]) {
    return categories.filter(category => categoryIds!.indexOf(category.id) >= 0)

}