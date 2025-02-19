import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStorageService } from './storage/user-storage.service';


const BASIC_URL = "http://localhost:5454/";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private userStorageService: UserStorageService) { }

  register(signuprequest:any):Observable<any>
  {
    return this.http.post(BASIC_URL+"sign-up",signuprequest);
  }

  login(userName: any, password: any) {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    const body = {userName,password};

    return this.http.post(BASIC_URL+'authenticate',body,{headers,observe:'response'})
    .pipe(
      map((res) =>{
        const token = res.headers.get('Authorization').substring(6).trim();
        const user = res.body;
        console.log('Received JWT Token: ', token);
        
        if(token && user)
          {
        this.userStorageService.saveToken(token);
        this.userStorageService.saveUser(JSON.stringify(user));
        return true;
          }
          return false;
      })
    );
  }

}
