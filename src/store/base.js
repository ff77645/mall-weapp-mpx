import { defineStore } from '@mpxjs/pinia'
import { customerApi } from '@/api/common.js'
import mpx from '@mpxjs/core'

export const useBasicDataStore = defineStore('base', {
  state: () => {
    return {
      firstName: '',
      lastName: '',
      customer: {},
      openid: ''
    }
  },
  getters: {
    fullName(state) {
      return state.firstName + state.lastName
    }
  },
  actions: {
    async getCustomerInfo() {
      if (this.customer.id) return
      const data = await mpx.login()
      console.log({ data })
      if (data.errMsg !== 'login:ok') return
      const res = await customerApi.findForWxCode({ code: data.code })
      console.log({ res })
      this.openid = res.openid
      if (res.customer) {
        this.customer = res.customer
      }
    },
    setFirstName() {},
    setLastNamr() {},
    setOpenid(val) {
      this.openid = val
    },
    setCustomer(val) {
      this.customer = val
    }
  }
})
