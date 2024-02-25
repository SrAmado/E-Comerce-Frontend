import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.scss']
})
export class ViewProductDetailComponent {

  idProduct: number = this.activatedRoute.snapshot.params['idProduct'];
  //idUser : number = UserStorageService.getUserId();
  //idUser: number = UserStorageService.getUserId();

  product: any;
  FAQS: any[] = [];
  reviews: any[] = [];

  constructor(private snackBark: MatSnackBar,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
    ){}

    ngOnInit(){
      this.getProductDetailById();
    }

    getProductDetailById() {
      this.customerService.getProductDetailById(this.idProduct).subscribe(res => {
        this.product = res.productDto;
        this.product.processedImg = 'data:image/png;base64,' + res.productDto.byteImg;

        this.FAQS = res.faqDtoList;

        res.reviewDtoList.forEach(element => {
          element.processedImg = 'data:image/png;base64,' + res.productDto.returnedImg;
          this.reviews.push(element);
        });
      })
    }

    addToWishlist() {
      const orderDto = {
        idUser: UserStorageService.getUserId(),
        idProduct: this.idProduct
      };
      
      
      this.customerService.addProductToWishlist(orderDto).subscribe(res => {
        if(res.id != null){
          this.snackBark.open('Producto Agregado a Wishlist exito', 'close', {duration:5000});
        }
        else{
          this.snackBark.open('Already in wishlist', 'ERROR', {duration:5000});
        }
      })
    }
}
