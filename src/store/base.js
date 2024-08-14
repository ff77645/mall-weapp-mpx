import { defineStore } from '@mpxjs/pinia'
import { customerApi, customerAddressApi } from '@/api/customer'
import mpx from '@mpxjs/core'

export const useBasicDataStore = defineStore('basic', {
  state: () => {
    return {
      firstName: '',
      lastName: '',
      customer: {},
      openid: '',
      addressList: [],
      currentAddress: null
    }
  },
  getters: {
    fullName(state) {
      return state.firstName + state.lastName
    }
  },
  actions: {
    // 查询会员信息
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
    // 查询会员地址
    async getAddressList() {
      const data = await customerAddressApi.findAll({
        customer_id: this.customer.id
      })
      this.addressList = data
      if (!data.length) return
      if (this.currentAddress) {
        this.currentAddress = data.find(i => i.id === this.addressList.id) || data[0]
      } else {
        this.currentAddress = data[0]
      }
    },
    // 初始化基础数据
    async initBasicData() {
      await this.getCustomerInfo()
      await this.getAddressList()
    },
    setCurrentAddress(address) {
      this.currentAddress = address
    }
  }
})
