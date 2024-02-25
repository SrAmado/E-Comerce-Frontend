import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-placer-order',
  templateUrl: './placer-order.component.html',
  styleUrls: ['./placer-order.component.scss']
})
export class PlacerOrderComponent {

  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private customerService: CustomerService, 
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) {}

    ngOnInit() {
      this.orderForm = this.fb.group({
        address: [ null, [Validators.required]],
        orderDescription: [ null, [Validators.required]],
      })
    }

    placeOrder() {
      this.customerService.placeOrder(this.orderForm.value).subscribe(res => {
        if(res.id != null){
          this.snackBar.open("order placed exitosa", 'Close', {duration:5000});
          this.router.navigateByUrl("/customer/my-orders");
          this.closeForm();
        }else {
          this.snackBar.open("someting went wrong", 'Close', {duration:5000});
        }
      })
    }

    closeForm() {
      this.dialog.closeAll();
    }

}
