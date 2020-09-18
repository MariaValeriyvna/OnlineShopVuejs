import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import CartPage from '../pages/CartPage.vue';
import ProductPage from '../pages/ProductPage.vue';
import NotFound from '../pages/NotFoundPage.vue';

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'cart', component: CartPage, path: '/' },
  { name: 'product', component: ProductPage, path: '/product/:id' },
  { name: 'not found', component: NotFound, path: '*' },
];

Vue.use(VueRouter);
const router = new VueRouter({ routes });
export default router;