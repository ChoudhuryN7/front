import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItem: any[] =[];
  order:any;

  constructor(
    private customerService: CustomerService,private fb:FormBuilder,
    private formbuilder:FormBuilder,
    private snackBar:MatSnackBar,
    private router : Router){
      
    }

    ngOnInit(){
      this.getCart();
    }

    getCart(){
      this.cartItem = [];
      this.customerService.getCartByUserId().subscribe(
        res=>{
          this.order =res;
          res.cartItems.forEach(element =>{
            element.image = 'data:image/jpeg;base64,' + element.returnByteImg;
            this.cartItem.push(element);
          })
        }
      )
    }

    increaseQuantity(productId:any)
    {
      this.customerService.increaseProductQuantity(productId).subscribe(
        res =>{
          this.snackBar.open('Product quantity increased!','Close',{duration:5000});
          this.getCart();
        }
      )
    }
}
