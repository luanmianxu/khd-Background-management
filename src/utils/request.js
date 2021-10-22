import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// 创建一个axios实例
console.log(process.env.VUE_APP_BASE_API);
const service = axios.create({
  
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 在跨域请求时发送cookie
  timeout: 5000 // 请求超时
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    if (store.getters.token) {
      // 让每个请求携带令牌
      // ['X-Token']是一个自定义头键
      // 请根据实际情况进行修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // 为了调试
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果您想获得http信息，如头或状态请返回响应 => response
  */

  /**
   * 通过自定义codeHere确定请求状态只是一个例子
   * 您也可以通过HTTP状态码来判断状态
   */
  response => {
    const res = response.data
    console.log(response);

    // 如果定制代码不是20000，则判定为错误.
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      //我不知道 我们有哪些状态码
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('您已注销，您可以取消停留在此页面，或重新登录', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
