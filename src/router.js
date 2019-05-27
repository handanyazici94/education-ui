import Vue from 'vue'
import Router from 'vue-router'
import ListLessons from './containers/ListLessons'
import ListStudents from './containers/ListStudents'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'lessons',
      component: ListLessons
    },
    {
      path: '/students',
      name: 'students',
      component: ListStudents
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    }
  ]
})
