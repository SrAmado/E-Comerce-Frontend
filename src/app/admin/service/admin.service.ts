import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http: HttpClient) { }

  addCategory(category: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/category', category, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllCategories(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/category', {
      headers: this.createAuthorizationHeader(),
    })
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/product', product, {
      headers: this.createAuthorizationHeader(),
    })
  }

  updateProduct(idProduct: any, product: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/admin/product/${idProduct}`, product, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllProducts(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/product', {
      headers: this.createAuthorizationHeader(),
    })
  }

  getProductById(idProduct): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/product/${idProduct}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/search/${name}`, {  
      headers: this.createAuthorizationHeader(),
    })
  }

  deleteProduct(idProduct: any): Observable<any> {
    return this.http.delete(BASIC_URL + `api/admin/product/${idProduct}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  addCoupont(couponDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/coupons', couponDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getCouponts(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/coupons', {
      headers: this.createAuthorizationHeader(),
    })
  }

  getPlacedOrders(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/placed-orders', {
      headers: this.createAuthorizationHeader(),
    })
  }

  changeOrderStatus(idOrder: Number, status: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/order/${idOrder}/${status}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  postFAQ(idProduct: Number, faqDto: string): Observable<any> {
    return this.http.post(BASIC_URL + `api/admin/faq/${idProduct}`, faqDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAnalytics(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/order/analytics', {
      headers: this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}
