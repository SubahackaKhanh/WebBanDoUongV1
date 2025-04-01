import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
import ProductPage from '../views/ProductPage.vue';
import ContactPage from '../views/ContactPage.vue';
import LoginPage from '../views/LoginPage.vue';
import CategoryPage from '../views/CategoryPage.vue';
import AdminLoginPage from '../views/AdminLoginPage.vue';
import AdminPage from '../views/AdminPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import AddProduct from '../views/AddProduct.vue';
import UpdateProduct from '../views/UpdateProduct.vue';
import DeleteProduct from '../views/DeleteProduct.vue';
import ListProducts from '../views/ListProducts.vue';
import ListUsers from '../views/ListUsers.vue';
import DeleteUser from '../views/DeleteUser.vue';
import ListOrders from '../views/ListOrders.vue';
import UpdateOrder from '../views/UpdateOrder.vue';
import DeleteOrder from '../views/DeleteOrder.vue';
import AdminProductsList from '../views/AdminProductsList.vue';
import ProductsCart from '../views/ProductsCart.vue';
import ProductDetail from '../views/ProductDetail.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/products', component: ProductPage },
  { path: '/contact', component: ContactPage },
  { path: '/login', component: LoginPage },
  { path: '/category', component: CategoryPage },
  { path: '/detail/:id', component: ProductDetail },
  { path: '/cart', component: ProductsCart },
  { path: '/admin/login', component: AdminLoginPage },
  { path: '/user/register', component: RegisterPage },
  {
    path: '/admin-page',
    component: AdminPage,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', component: ListProducts },
      { path: 'add-product', component: AddProduct },
      { path:'admin-product-list', component: AdminProductsList},
      { path: 'update-product', component: UpdateProduct },
      { path: 'delete-product', component: DeleteProduct },
      { path: 'list-products', component: ListProducts },
      { path: 'list-users', component: ListUsers },
      { path: 'delete-user', component: DeleteUser },
      { path: 'list-orders', component: ListOrders },
      { path: 'update-order', component: UpdateOrder },
      { path: 'delete-order', component: DeleteOrder }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!admin) {
      next({
        path: '/admin/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;