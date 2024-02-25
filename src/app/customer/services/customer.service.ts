import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/customer/product', {
      headers: this.createAuthorizationHeader(),
    })
  }

  
  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/search/${name}`, {  
      headers: this.createAuthorizationHeader(),
    })
  }

  addToCart(idProduct: any): Observable<any> {
    const cartDto = {
      idProduct: idProduct,
      idUser: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + 'api/customer/cart', cartDto , {  
      headers: this.createAuthorizationHeader(),
    })
  }

  increaseProductQuantity(idProduct: any): Observable<any> {
    const cartDto = {
      idProduct: idProduct,
      idUser: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + 'api/customer/addition', cartDto , {  
      headers: this.createAuthorizationHeader(),
    })
  }

  decreaseProductQuantity(idProduct: any): Observable<any> {
    const cartDto = {
      idProduct: idProduct,
      idUser: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + 'api/customer/deduction', cartDto , {  
      headers: this.createAuthorizationHeader(),
    })
  }


  getCartByUserId(): Observable<any> {
    const idUser = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/cart/${idUser}`, {  
      headers: this.createAuthorizationHeader(),
    })
  }

  applyCoupon(code: any): Observable<any> {
    const idUser = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/coupon/${idUser}/${code}`, {  
      headers: this.createAuthorizationHeader(),
    })
  }

  placeOrder(orderDto: any): Observable<any> {
    orderDto.idUser = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + 'api/customer/place-order', orderDto ,{  
      headers: this.createAuthorizationHeader(),
    })
  }

  getOrderByIdUser(): Observable<any> {
    const idUser = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/my-orders/${idUser}`,{  
      headers: this.createAuthorizationHeader(),
    })
  }

  getOrderProduct(idOrder: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/order-products/${idOrder}`,{  
      headers: this.createAuthorizationHeader(),
    })
  }

  giveReview(reviewDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/customer/review', + reviewDto , {  
      headers: this.createAuthorizationHeader(),
    })
  }

  getProductDetailById(idProduct: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/product/${idProduct}`,{  
      headers: this.createAuthorizationHeader(),
    })
  }

  addProductToWishlist(Dto: any): Observable<any> {
    Dto.idUser = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + 'api/customer/wishlist', Dto ,{  
      headers: this.createAuthorizationHeader(),
    })
  }
  
  getWishlistByUserId(): Observable<any> {
    const idUser = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/wishlist/${idUser}`, {  
      headers: this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}
