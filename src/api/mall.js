import { RestApi } from './rest-api'

export const mallCartApi = new RestApi('/mall/cart')
export const mallOrderApi = RestApi.extend('/mall/order', {
  checkout(params) {
    this.agent.post(this.url + '/checkout', params)
  }
})
