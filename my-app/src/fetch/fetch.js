import requestFun from './requestFun'
import qs from 'qs'
 
const {stringify} = qs
const {get, post} = requestFun
export async function getData(url, params) {
    return get(`${url}?${stringify(params)}`)
}

export async function postData(url, params) {
    return post(url, params)
}