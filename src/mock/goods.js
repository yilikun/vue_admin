/* eslint-disable */
import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: '我是测试数据',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}

// export default {
//   getList: config => {
//     const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

//     let mockList = List.filter(item => {
//       if (importance && item.importance !== +importance) return false
//       if (type && item.type !== type) return false
//       if (title && item.title.indexOf(title) < 0) return false
//       return true
//     })

//     if (sort === '-id') {
//       mockList = mockList.reverse()
//     }

//     const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

//     return {
//       total: mockList.length,
//       items: pageList
//     }
//   },
//   getPv: () => ({
//     pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
//   }),
//   getArticle: (config) => {
//     const { id } = param2Obj(config.url)
//     for (const article of List) {
//       if (article.id === +id) {
//         return article
//       }
//     }
//   },
//   createArticle: () => ({
//     data: 'success'
//   }),
//   updateArticle: () => ({
//     data: 'success'
//   })
// }
export default {
    getList: {
        "err_code": "0",
        "err_msg": "成功",
        "total": "5",
        "data": [
            {
                "id": "1",
                "number": "6",
                "price": "600",
                "description": "购买6个房卡",
                "disabled": "0"
            },
            {
                "id": "2",
                "number": "30",
                "price": "3000",
                "description": "购买30个房卡",
                "disabled": "0"
            },
            {
                "id": "3",
                "number": "68",
                "price": "6800",
                "description": "购买68个房卡",
                "disabled": "0"
            },
            {
                "id": "4",
                "number": "128",
                "price": "12800",
                "description": "购买128个房卡",
                "disabled": "0"
            },
            {
                "id": "41",
                "number": "100",
                "price": "100",
                "description": "购买100个房卡",
                "disabled": "0"
            }
        ]
    },
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getGoods: (config) => {
    const { id } = param2Obj(config.url)
    for (const article of List) {
      if (article.id === +id) {
        return article
      }
    }
  },
  createGoods: () => ({
    data: 'success'
  }),
  updateGoods: () => ({
    data: 'success'
  })
}
