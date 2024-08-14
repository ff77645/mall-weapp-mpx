import { RestApi } from './rest-api'

export const customerAddressApi = new RestApi('/customer/address')

export const customerApi = RestApi.extend('/customer/client', {
  findForWxCode(params) {
    return this.agent.post(this.url + '/wxcode', params)
  }
})
