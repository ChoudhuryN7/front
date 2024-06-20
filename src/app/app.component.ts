import { Component } from '@angular/core';
import { UserStorageService } from './services/auth/storage/user-storage.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myecommerceapp';

  isCustomerLoggedIn: Boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: Boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router: Router
  ){}


  ngOnInit(){
    this.router.events.subscribe(event =>
      {
        this.isCustomerLoggedIn=UserStorageService.isCustomerLoggedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      }
    )
  }

  logout()
  {
    UserStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
