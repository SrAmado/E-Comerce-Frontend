import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-coupon',
  templateUrl: './post-coupon.component.html',
  styleUrls: ['./post-coupon.component.scss']
})
export class PostCouponComponent {


  couponForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router:Router, 
    private adminService: AdminService,
    private snackBar: MatSnackBar) {}


  ngOnInit(){
    this.couponForm =this.fb.group({
      name:[null, [Validators.required]],
      code:[null, [Validators.required]],
      discount:[null, [Validators.required]],
      expirationDate:[null, [Validators.required]],
    })
  }
    
  addCoupon() {
    if(this.couponForm.valid){
      this.adminService.addCoupont(this.couponForm.value).subscribe(res => {
        if(res.id != null){
          this.snackBar.open('Agregado con exito', 'close', {duration: 5000});
          this.router.navigateByUrl('admin/dashboard');
        }else{
          this.snackBar.open(res.message, 'ERROR', {duration: 5000, panelClass:'error-snackBar'});
        }
      });
    }else{
      this.couponForm.markAllAsTouched();
    }
  } 
  
}
