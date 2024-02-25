import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-order-products',
  templateUrl: './view-order-products.component.html',
  styleUrls: ['./view-order-products.component.scss']
})
export class ViewOrderProductsComponent {

  idOrder: any = this.activateRoute.snapshot.params['idOrder'];
  orderProductDetailsList = [];
  totalAmount:any;

  constructor(
    private activateRoute: ActivatedRoute,
    private customerService: CustomerService,){}

    ngOnInit(){
      this.getOrderProductsDetailsByOrderId();
    }

    getOrderProductsDetailsByOrderId(){
      this.customerService.getOrderProduct(this.idOrder).subscribe(res => {
        res.productDtoList.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.orderProductDetailsList.push(element)
        });
        this.totalAmount = res.orderAmount;
      })
    }
}
