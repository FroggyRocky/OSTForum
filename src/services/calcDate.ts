export function calcDate(createdAt:string) {
    const date = new Date()
    const date2 = new Date(createdAt) as Date
    let dateDifference: number | string = Math.floor((date.getTime() - date2.getTime()) / (1000 * 3600 * 24));
    if (dateDifference === 0) {
        return 'Today'
    } else if (dateDifference >= 7) {
        dateDifference = Math.ceil((dateDifference % 365) / 7)
        if (dateDifference === 0) {
            return '1 week'
        } else {
            return dateDifference + ' weeks'
        }
    } else if (dateDifference >= 365) {
        Math.ceil(dateDifference / 365)
        if (dateDifference === 0) {
            return '1 year'
        } else {
            return dateDifference + ' years'
        }
    } else if (dateDifference < 7) {
        return dateDifference + ' days'
    }
}