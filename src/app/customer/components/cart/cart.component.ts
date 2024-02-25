import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { PlacerOrderComponent } from '../placer-order/placer-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartItems: any[] = [];
  order: any;

  couponForm!: FormGroup;

  constructor(
    private customerService: CustomerService, 
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {}

    ngOnInit(){
      this.couponForm = this.fb.group({
        code: [null, [Validators.required]]
      })
      this.getCart();
    }

    applyCoupon() {
      this.customerService.applyCoupon(this.couponForm.get(['code'])!.value).subscribe(res =>{
        this.snackBar.open("Cupon aplicado", 'Close', {duration:5000});
        this.getCart();
      }, error =>{
        this.snackBar.open(error.error, 'Close', {duration:5000});
      })
    }

    getCart(){
      this.cartItems = [];
      this.customerService.getCartByUserId().subscribe(res => {
        this.order = res;
        res.cartItems.forEach(element => {
          element.proccessedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.cartItems.push(element);
        });
      })
    }

    increaseProductQuantity(idProduct: any) {
      this.customerService.increaseProductQuantity(idProduct).subscribe(res => {
        this.snackBar.open("Producto incrmentado", 'Close', {duration:5000});
        this.getCart();
      })
    }

    decreaseProductQuantity(idProduct: any) {
      this.customerService.decreaseProductQuantity(idProduct).subscribe(res => {
        this.snackBar.open("Producto drecrementado", 'Close', {duration:5000});
        this.getCart();
      })
    }

    placeOrder(){
      this.dialog.open(PlacerOrderComponent);
    }

}
