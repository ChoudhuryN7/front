import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 
  products: any[] = [];
  searchProductForm!:FormGroup;

  constructor(
    private customerService: CustomerService,private fb:FormBuilder,
    private formbuilder:FormBuilder,
    private snackBar:MatSnackBar,
    private router : Router){
      
    }


  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm=this.fb.group({
      title:[null,[Validators.required]]
    })
  }

  getAllProducts(){
    this.customerService.getAllProducts().subscribe(
      res=>{
        res.forEach(element => {
            
            element.image = 'data:image/jpeg;base64,' + element.byteimg;
            this.products.push(element);

        });
      },
      error=>{console.log('error is:--',error)}
    )
  }




  submitForm(){
    this.products=[];
    const title = this.searchProductForm.get('title')!.value;
    this.customerService.getAllProductsByName(title).subscribe(
      res=>{
        res.forEach(element => {
          element.image= 'data:image/jpeg;base64,'+element.byteimg;
          this.products.push(element);
        });
      }
    )
  }

  addToCart(id:any)
  {
    this.customerService.addToCart(id).subscribe(
      res =>{
        this.snackBar.open("Product added to cart successfully!","Close",{
          duration: 5000
        })
      }
    )
  } 
}
