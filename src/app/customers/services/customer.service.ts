import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/auth/storage/user-storage.service';


const BASIC_URL = "http://localhost:5454/";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getAllProducts(): Observable<any>
  {
    const head = this.createAuthorizeHeader()
    return this.http.get(BASIC_URL + 'api/customer/products',
      {
        headers:head,
      }
    )
  }

  getAllProductsByName(name: any): Observable<any>
  {
    const head = this.createAuthorizeHeader()
    return this.http.get(BASIC_URL + `api/customer/search/${name}`,
      {
        headers:head,
      }
    )
  }

  addToCart(productId: any): Observable<any>
  {
    const body = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    const head = this.createAuthorizeHeader()
    return this.http.post(BASIC_URL + `api/customer/cart`,body,
      {
        headers:head,
      }
    )
  }

  increaseProductQuantity(productId: any): Observable<any>
  {
    const body = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    const head = this.createAuthorizeHeader()
    return this.http.post(BASIC_URL + `api/customer/addition`,body,
      {
        headers:head,
      }
    )
  }

  getCartByUserId(): Observable<any>
  {
    const userId = UserStorageService.getUserId();
    const head = this.createAuthorizeHeader()
    return this.http.get(BASIC_URL + `api/customer/cart/${userId}`,
      {
        headers:head,
      }
    )
  }


  
  createAuthorizeHeader():HttpHeaders
{
  const jwttoken =UserStorageService.getToken();
  console.log('datatype of jwttoken',typeof jwttoken)
  return  new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer${jwttoken}`
  })
  
}
}
