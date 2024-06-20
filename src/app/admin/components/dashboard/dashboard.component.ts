import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm:FormGroup;

  constructor(
    private adminService: AdminService,private fb:FormBuilder,
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
    this.adminService.getAllProducts().subscribe(
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
    this.adminService.getAllProductsByName(title).subscribe(
      res=>{
        res.forEach(element => {
          element.image= 'data:image/jpeg;base64,'+element.byteimg;
          this.products.push(element);
        });
      }
    )
  }

  deleteProduct(productId:any)
  {
    this.adminService.deleteProduct(productId).subscribe(
      res=>{
        if(res==null)
        {
          this.snackBar.open('Product deleted successfully!','Close',
            {
              duration: 5000
            }
          )
          this.products =[];
          this.getAllProducts();
        }
        else
        {
          this.snackBar.open(res.message,'Close',
            {
              duration: 5000,
              panelClass: 'error-snackbar'
            }
          )
        }
      }
    )
  }
}
