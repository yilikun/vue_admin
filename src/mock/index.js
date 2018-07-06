import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import goodsAPI from './goods'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock('/v1/admin/login', 'post', loginAPI.loginByUsername)
// Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 商品相关
Mock.mock(/\/goods\/list/, 'get', goodsAPI.getList)
Mock.mock(/\/goods\/detail/, 'get', goodsAPI.getGoods)
Mock.mock(/\/goods\/pv/, 'get', goodsAPI.getPv)
Mock.mock(/\/goods\/create/, 'post', goodsAPI.createGoods)
Mock.mock(/\/goods\/update/, 'post', goodsAPI.updateGoods)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

export default Mock
