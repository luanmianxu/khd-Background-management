import request from '@/utils/request'

export function login(data) {
  console.log(data);
  return request({
    url: '/store/login',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   console.log(token);
//   console.log('为什么我会执行');
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
