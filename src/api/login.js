import { request } from '../utils/request/index'

// 游客登录
// export const travelLogin = params => {
//   return request.get('/login/travel', { params })
// }

// 微信号登录
export const wxLogin = params => {
  return request.post('/login/wxcode', params)
}
