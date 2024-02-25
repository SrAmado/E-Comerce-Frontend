import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders: any;

  constructor(
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ){}

  ngOnInit(){
    this.getPlacedOrders();
  }
  
  getPlacedOrders() {
    this.adminService.getPlacedOrders().subscribe(res => {
      this.orders = res;
    })
  }

  changeOrderStatus(idOrder:Number, status: string) {
    this.adminService.changeOrderStatus(idOrder,status).subscribe(res =>{
      if(res.id != null){
        this.snackBar.open('Order status changed succefull', 'Close', {duration: 5000});
        this.getPlacedOrders();
      }
      else {
        this.snackBar.open('Error al guardar', 'ERROR', {duration: 5000});
      }
    })
  }
}
