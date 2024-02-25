import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ViewOrderProductsComponent } from './components/view-order-products/view-order-products.component';
import { ReviewOrderProductComponent } from './components/review-order-product/review-order-product.component';
import { ViewProductDetailComponent } from './components/view-product-detail/view-product-detail.component';
import { ViewWishlistComponent } from './components/view-wishlist/view-wishlist.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'order-product/:idOrder', component: ViewOrderProductsComponent},
  { path: 'review/:idProduct', component: ReviewOrderProductComponent},
  { path: 'product/:idProduct', component: ViewProductDetailComponent},
  { path: 'wishlist', component: ViewWishlistComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
