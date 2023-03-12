import axios from "axios";
import {serverURL} from "./URL";
import {TapLinkType} from "../redux/taplink/tapLinkType";

const withAuthInstance = axios.create({
    baseURL: serverURL,
    withCredentials:true,
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('MyClickToken')}`,
    }
})

export const tapLinksAPI = {
    async getTapLinks() {
            const tapLinks = await withAuthInstance.get<TapLinkType[]>('/get-taplinks').then(res => res.data)
            return tapLinks

    },
    async synchronizeTapLinks() {
            const synchronizedTapLinks = await withAuthInstance.get<TapLinkType[]>('/synchronize-taplinks').then(res => res.data)
        return synchronizedTapLinks
},
    async updateTapLinks(updatedTapLinks:TapLinkType[]) {
        await withAuthInstance.post('/update-taplinks', updatedTapLinks)
    },
    async updateTapLinkArticle(data:{id:number, articleId:number}) {
        const updatedTapLinks = await withAuthInstance.post('/update-taplink-article', data)
        return updatedTapLinks
    }
}