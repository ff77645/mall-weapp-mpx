import { defineStore } from '@mpxjs/pinia'

export const useBasicDataStore = defineStore('base', {
  state: () => {
    return {
      firstName: '',
      lastName: '',
      customer: {},
      openid: '66666666666'
    }
  },
  getters: {
    fullName(state) {
      return state.firstName + state.lastName
    }
  },
  actions: {
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
