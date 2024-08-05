
import { request } from '../utils/request/index'
import { RestApi } from './rest-api'

export const loginForWxCode = params => {
  request.post('/login/wxcode', { params })
}

export const customerApi = RestApi.extend('/customer/client', {
  findForWxCode(params) {
    return this.agent.post(this.url + '/wxcode', params)
  }
})
