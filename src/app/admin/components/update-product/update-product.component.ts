import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

export interface ProductFormData {
  categoryId: number;
  name: string;
  description: string;
  price: number;
  img?: File | null;
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})

export class UpdateProductComponent {

  idProduct = this.activatedRoute.snapshot.params['idProduct'];

  productForm!: FormGroup;
  listOfCategories: any = [];
  selectedFile: File | null;
  imagePreview: String | ArrayBuffer | null;

  existingImage: string | null = null;
  imgChange = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChange = true;

    this.existingImage = null;
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.getAllCategories();
    this.getProductById();
  }

  getAllCategories() {
    this.adminService.getAllCategories().subscribe(res => {
      this.listOfCategories = res;
    });
  }

  getProductById() {
    this.adminService.getProductById(this.idProduct).subscribe(res => {
      this.productForm.patchValue(res);
      this.existingImage = 'data:image/jpeg;base64,' + res.byteImg;
    });
  }

  updateProduct(): void {
    if (this.productForm.valid) {
      
      const productData: ProductFormData = {
        categoryId: this.productForm.get('categoryId').value,
        name: this.productForm.get('name').value,
        description: this.productForm.get('description').value,
        price: this.productForm.get('price').value,
        img: this.imgChange && this.selectedFile ? this.selectedFile : null,
      };

      this.adminService.updateProduct(this.idProduct, productData).subscribe(res => {
        if (res.id != null) {
          this.snackBar.open('Producto Actualizado Exitosamente', 'ok', { duration: 5000 });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open('Error al guardar', 'ERROR', { duration: 5000 });
        }
      });
    } else {
      for (const i in this.productForm.controls) {
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
      // this.productForm.markAllAsTouched();
    }
  }
}