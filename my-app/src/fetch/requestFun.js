import { message } from 'antd'
import 'whatwg-fetch'
import qs from 'qs'
import Operation from 'antd/lib/transfer/operation'
const { stringify, parse } = qs

const checkStatus = res => {
    if(200 <= res <300) {return res}
    message.error(`网络请求失败，${res.status}`)
    const error = new Error(res.statusText)
    throw error
}
/**
 *  捕获成功登录过期状态码等
 * @param res
 * @returns {*}
 */
const judgeOkState = async res => {
    const cloneRes = await res.clone().json()
    if(cloneRes.code !== 0) {
        message.error(`${cloneRes.message}${cloneRes.code}`)
    }
    return res
}

/**
 * 捕获失败
 * @param error
 */
const handleError = (err) => {
    if(err instanceof TypeError){
        message.error(`网络请求失败啦！${err}`)
    }
    return {
        code:-1,
        data: false
    }
}

class http {
    static async staticFetch(url = '', options = {}) {
        const defaultOptions = {
            credentials: 'include',
            mode: 'cors',
            headers: {
                token: null,
                Authorrization: null,
                // 'content-type': 'application/x-wwww-form-urlencoded'
            }
        }
        if(options.method === 'POST' || options.method === 'PUT') {
            defaultOptions.headers['Content-Type'] = 'application/json; charset=utf-8'
        }

        const newOptions = {...defaultOptions, ...options}
        console.log('newOptions', newOptions)
        return fetch(url, newOptions)
        .then(checkStatus)
        .then(judgeOkState)
        .then(res => res.json())
        .catch(handleError)

    }

    post(url, params = {}, option = {}) {
        const options = Object.assign({method: 'POST'}, option)
        //一般我们常用场景用的是json，所以需要在headers加Content-Type类型
        options.body = JSON.stringify(params)

        if(options.type === 'FormData' && options.body !== 'undefined') {
            let params = new FormData()
            for(let key of Object.keys(options.body)) {
                params.append(key, options.body[key])
            }
            options.body = params
        }
        return http.staticFetch(url, options)
    }

    put(url, params = {}, option = {}) {
        const options = Object.assign({ method: 'PUT' }, option);
        options.body = JSON.stringify(params);
        return http.staticFetch(url, options); //类的静态方法只能通过类本身调用
      }
    /**
   * get请求方式
   * @param url
   * @param option
   */
  get(url, option = {}) {
    const options = Object.assign({ method: 'GET' }, option);
    return http.staticFetch(url, options);
  }

}
const requestFun = new http()
export const {post, put, get} = requestFun
export default requestFun