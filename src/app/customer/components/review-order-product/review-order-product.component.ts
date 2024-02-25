import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-review-order-product',
  templateUrl: './review-order-product.component.html',
  styleUrls: ['./review-order-product.component.scss']
})
export class ReviewOrderProductComponent {

  idProduct: any = this.activatedRoute.snapshot.params['idProduct'];
  reviewForm: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  
  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private customerService: CustomerService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,) {}

  ngOnInit() {
    this.reviewForm = this.fb.group({
      rating: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  submitForm() {
    const formData: FormData = new FormData();
    const userId = UserStorageService.getUserId();

    formData.append('img', this.selectedFile);
    formData.append('idProduct', this.idProduct.toString());
    formData.append('idUser', userId);
    formData.append('rating', this.reviewForm.get('rating').value);
    formData.append('description', this.reviewForm.get('description').value);

    console.log("Datos enviados en formData:");
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.customerService.giveReview(formData).subscribe(res => {
      if(res.id != null) {
        this.snackBar.open('Review Agregado Exitosamente', 'ok', {duration: 5000});
      }
      else {
        this.snackBar.open('Error al guardar', 'ERROR', {duration: 5000});
      }
    })
  }

}
