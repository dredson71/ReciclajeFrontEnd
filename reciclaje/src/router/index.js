import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Departamentos from '../components/Departamento.vue'
import Departamento_Detail from '../components/Departamento_Detail.vue'
import Distrito_Detail from '../components/Distrito_Detail.vue'
import Distritos from '../components/Distrito.vue'
import Asociacion_Detail from '../components/Asociacion_Detail.vue'
import Asociaciones from '../components/Asociacion.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/departamento',
    name: 'departamentos',
    component: Departamentos
  },
  {
    path: '/departamento/:departamentoID',
    name: 'departamentos_detail',
    component: Departamento_Detail,
    props: true,
  },
  {
    path: '/distrito',
    name: 'distritos',
    component: Distritos
  },
  {
    path: '/distrito/:distritoID',
    name: 'distritos_detail',
    component: Distrito_Detail,
    props: true,
  },
  {
    path: '/asociacion',
    name: 'asociaciones',
    component: Asociaciones
  },
  {
    path: '/asociacion/:asociacionID',
    name: 'asociacion_detail',
    component: Asociacion_Detail,
    props: true,
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
