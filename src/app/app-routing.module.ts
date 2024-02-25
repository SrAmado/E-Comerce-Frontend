import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigupComponent } from './sigup/sigup.component';
import { TrackOrderComponent } from './track-order/track-order.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "sing-up", component: SigupComponent},
  {path: "order", component: TrackOrderComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, 
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
