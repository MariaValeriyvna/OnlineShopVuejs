import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import CartPage from '../pages/CartPage.vue';
import ProductPage from '../pages/ProductPage.vue';
import NotFound from '../pages/NotFoundPage.vue';
import OrderPage from '../pages/OrderPage.vue';
import OrderInfoPage from '../pages/OrderInfoPage.vue';

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'cart', component: CartPage, path: '/cart' },
  { name: 'product', component: ProductPage, path: '/product/:id' },
  { name: 'order', component: OrderPage, path: '/order' },
  { name: 'orderInfo', component: OrderInfoPage, path: '/order/:id' },
  { name: 'not found', component: NotFound, path: '*' },
];

Vue.use(VueRouter);
const router = new VueRouter({ routes });
export default router;
