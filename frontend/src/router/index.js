import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home/Home.vue';
import Catalog from '../views/Catalog/Catalog.vue';
import Product from '../views/Product/Product.vue';
import Cart from '../views/Cart/Cart.vue';
import Profile from '../views/Profile/Profile.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/catalog', name: 'Catalog', component: Catalog },
  { path: '/product/:id', name: 'Product', component: Product },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/profile', name: 'Profile', component: Profile }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;