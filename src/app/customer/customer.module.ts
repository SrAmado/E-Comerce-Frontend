import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoAngularMaterailModule } from '../DemoAngularMaterial';
import { CartComponent } from './components/cart/cart.component';
import { PlacerOrderComponent } from './components/placer-order/placer-order.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ViewOrderProductsComponent } from './components/view-order-products/view-order-products.component';
import { ReviewOrderProductComponent } from './components/review-order-product/review-order-product.component';
import { ViewProductDetailComponent } from './components/view-product-detail/view-product-detail.component';
import { ViewWishlistComponent } from './components/view-wishlist/view-wishlist.component';


@NgModule({
  declarations: [
    CustomerComponent,
    DashboardComponent,
    CartComponent,
    PlacerOrderComponent,
    MyOrdersComponent,
    ViewOrderProductsComponent,
    ReviewOrderProductComponent,
    ViewProductDetailComponent,
    ViewWishlistComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule ,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterailModule
  ]
})
export class CustomerModule { }
