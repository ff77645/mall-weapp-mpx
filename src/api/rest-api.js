import { request } from '../utils/request/index'

export class RestApi {
  constructor(url, agent) {
    this.url = url
    this.agent = agent || request
  }

  create(params) {
    return this.agent.post(this.url, params)
  }

  findAll(params) {
    return this.agent.get(this.url, { params })
  }

  findOne(id) {
    return this.agent.get(`${this.url}/${id}`)
  }

  update(id, params) {
    return this.agent.patch(`${this.url}/${id}`, params)
  }

  remove(id) {
    return this.agent.delete(`${this.url}/${id}`)
  }

  static extend(url, methods, agent) {
    const instance = new RestApi(url, agent)
    Object.assign(instance, methods)
    return instance
  }
}
