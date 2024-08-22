import { RestApi } from './rest-api'

export const packageApi = new RestApi('/product/package/package')
export const packageCategoryApi = new RestApi('/product/package/category')

export const productCategoryApi = new RestApi('/product/category')
export const productApi = new RestApi('/product/info')

export const productGuideApi = new RestApi('/product/guide/guide')
export const productGuideItemApi = new RestApi('/product/guide/item')

export const productRecipeApi = new RestApi('/product/recipe/')
