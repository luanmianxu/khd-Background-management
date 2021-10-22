import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note:子菜单只在route children.length时出现 >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item将不会显示在侧栏中(default is false)
 * alwaysShow: true               if set true, 总是显示根菜单
 *                                如果没有设置 alwaysShow, 当item有多个子路由时，
 *                                它将变成嵌套模式，否则不会显示根菜单
 * redirect: noRedirect           如果设置 noRedirect 不会在面包屑中重定向
 * name:'router-name'             该名称由<keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色 (可以设置多个角色)
    title: 'title'               名称显示在侧边栏和面包屑 (推荐设置)
    icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏
    breadcrumb: false            if set false, 该项目将隐藏在breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, 侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基本页面
    可以访问所有角色
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'shouye' }
    }]
  },

  {
    path: '/shop',
    component: Layout,
    redirect: '/shop//addshop',
    name: 'Shop',
    meta: { title: '商品', icon: 'shangping' },
    children: [
      {
        path: 'addshop',
        name: 'Addshop',
        component: () => import('@/views/shop/addshop/index'),
        meta: { title: '添加商品', icon: 'add' }
      },
      {
        path: 'shoplist',
        name: 'Shoplist',
        component: () => import('@/views/shop/shoplist/index'),
        meta: { title: '商品列表', icon: 'nested' }
      },
      {
        path: 'shopClassification',
        name: 'ShopClassification',
        component: () => import('@/views/shop/shopClassification/index'),
        meta: { title: '商品分类', icon: 'fenlei' }
      },
      {
        path: 'brand',
        name: 'Brand',
        component: () => import('@/views/shop/brand/index'),
        meta: { title: '品牌管理', icon: 'pinpai' }
      }
    ]
  },

  {
    path: '/marketing',
    component: Layout,
    name: 'Marketing',
    meta: { title: '营销', icon: 'yingxiao' },
    children: [
      {
        path: 'couponList',
        name: 'CouponList',
        component: () => import('@/views/marketing/couponList/index'),
        meta: { title: '优惠券列表', icon: 'youhuiquan' },
        
      },
      {
        path: 'secondsKill',
        name: 'SecondsKill',
        component: () => import('@/views/marketing/secondsKill/index'),
        meta: { title: '秒杀活动列表', icon: 'nested' },
        
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order',
    name: 'Nested',
    meta: {
      title: '订单',
      icon: 'dingdan'
    },
    children: [
      {
        path: 'orderList',
        component: () => import('@/views/order/orderList/index'), // Parent router-view
        name: 'OrderList',
        meta: { title: '订单列表',icon: 'nested' },
      },
      {
        path: 'salesReturn',
        component: () => import('@/views/order/salesReturn/index'),
        name: 'SalesReturn',
        meta: { title: '退货申请处理',icon: 'tuihuo' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '客服', icon: 'kefu' }
      }
    ]
  },
  {
    path: '/shophouse',
    component:Layout,
    name:'shophouse',
    children: [
      {
        path: '/shophouse',
        component:()=>import('@/views/shophouse/index'),
        meta: { title: '店铺信息', icon: 'dianpu' }
      }
    ]
  },

  //404页必须放在末尾 !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // 需要服务支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
