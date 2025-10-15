export default [
  // 帮助列表
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/help/index1.vue')
  },
  {
    path: '/helpDetail/:id',
    name: 'HelpDetail',
    component: () => import('@/views/help/helpDetail.vue')
  }
]
