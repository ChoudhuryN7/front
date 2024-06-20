import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/auth/storage/user-storage.service';


const BASIC_URL = "http://localhost:5454/";
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }


  addCateogry(categoryDto:any): Observable<any>
  {
    const head = this.createAuthorizeHeader()
    return this.http.post(BASIC_URL + 'api/admin/category',categoryDto,
      {
        headers:head,
      }
    )
  }

  getAllCateogry(): Observable<any>
  {
    const head = this.createAuthorizeHeader()
    return this.http.get(BASIC_URL + 'api/admin/get-categories',
      {
        headers:head,
      }
    )
  }
  getAllProducts(): Observable<any>
  {
    const head = this.createAuthorizeHeader()
    return this.http.get(BASIC_URL + 'api/admin/products',
      {
        headers:head,
      }
    )
  }

  getAllProductsByName(name: any): Observable<any>
  {
    const head = this.createAuthorizeHeader()
    return this.http.get(BASIC_URL + `api/admin/search/${name}`,
      {
        headers:head,
      }
    )
  }

  addProduct(productDto:any): Observable<any>
  {
    const head = this.createAuthorizeHeader()
    return this.http.post(BASIC_URL + 'api/admin/add-product',productDto,
      {
        headers:head,
      }
    )
  }

  deleteProduct(productId:any): Observable<any>
  {
    const head = this.createAuthorizeHeader()
    return this.http.delete(BASIC_URL + `api/admin/delete-product/${productId}`,
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



