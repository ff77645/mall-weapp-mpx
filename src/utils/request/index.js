import { RequestCache } from '../request-cache'
import mpx from '@mpxjs/core'
import mpxFetch from '@mpxjs/fetch'
import { useBasicDataStore } from '@/store/base'

mpx.use(mpxFetch)

// eslint-disable-next-line no-undef
const env = __env__
// const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdpZCI6Ijc5NzQ4YzM5LWEzZGUtNDM1MC04NDNkLTBmZWRjZDE2YTg5NiIsInBlcm1pc3Npb24iOiIiLCJ1aWQiOiI3OTc0OGMzOS1hM2RlLTQzNTAtODQzZC0wZmVkY2QxNmE4OTYiLCJ0eXBlIjowLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzE1NTg0MTQ5fQ.6VJ9iGVZEIOEmGf7oxlYzwP1cVLS7p_Ey6E3yoxbn40'
let token = ''

const baseUrl = env === 'production' ? 'https://dev.summer9.cn/api' : 'http://localhost:8000/api'

const cacheStore = new RequestCache()

const processError = data => {
  const msg = data.message ? String(data.message) : '请求失败'
  mpx.showToast({
    title: msg,
    icon: 'none'
  })
}

export const logout = () => {
  token = ''
}

export function request(opts) {
  const hash = cacheStore.getRequestId(opts)
  if (cacheStore.hasRequest(hash)) return console.warn('重复请求', opts)
  cacheStore.addRequest(hash)
  return new Promise((resolve, reject) => {
    opts.url = baseUrl + opts.url
    const options = {
      header: {
        authorization: 'Bearer ' + (token || (token = useBasicDataStore().token))
      }
    }
    Object.assign(options, {
      success: res => {
        if (res.statusCode < 400) return resolve(res.data)
        processError(res.data)
        reject(res.data)
      },
      fail: err => {
        console.log('fail', err)
        reject(err)
      },
      complete() {
        cacheStore.removeRequest(hash)
      }
    }, opts)
    mpx.xfetch.fetch(options)
  })
}

['post', 'patch', 'put'].forEach(method => {
  request[method] = function (url, data) {
    return request({ url, data, method })
  }
})

;['get', 'delete'].forEach(method => {
  request[method] = function (url, data = { params: undefined }) {
    return request({ url, method, data: data.params })
  }
})
