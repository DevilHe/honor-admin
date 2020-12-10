import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const playerRoutes: RouteConfig = {
  path: '/players',
  component: Layout,
  meta: {
    title: 'playerMgt', // i18n信息需要额外处理
    icon: 'peoples'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/players/list.vue'),
      meta: {
        title: 'playerList',
        icon: 'peoples'
      }
    },
    {
      path: 'create',
      component: () => import('@/views/players/create.vue'),
      meta: {
        title: 'createPlayer',
        icon: 'edit'
      }
    }
    // {
    //   path: 'edit/:id(\\d+)',
    //   component: () => import('@/views/players/edit.vue'),
    //   meta: {
    //     title: 'editPlayer',
    //     hidden: true, // 不在导航选项中出现
    //     noCache: true, // tag标签页应该是多个，不应该缓存
    //     activeMenu: '/players/list' // 左侧导航中激活的url
    //   }
    // }
  ]
}

export default playerRoutes
