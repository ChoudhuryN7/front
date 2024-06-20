import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { ProductDto } from './ProductDto';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.css'
})
export class PostProductComponent {

productForm: FormGroup<any>;
selectedFile: File | null;
listOfCategories: any =[];
imagePreview: string |  null;
productDto:ProductDto =new ProductDto(); 
constructor(
  private formbuilder:FormBuilder,
  private snackBar:MatSnackBar,
  private router : Router,
  private adminService:AdminService
)
{}


  onFileSelected(event :any) {
    this.selectedFile =event.target.files[0];
    this.previewImage();
    }

    previewImage()
    {
      const reader  = new FileReader();
      reader.onload = () => {
        this.imagePreview =reader.result as string;
      }
      reader.readAsDataURL(this.selectedFile);
    }
    

    ngOnInit():void {
      this.productForm = this.formbuilder.group({
        categoryId: [null,[Validators.required]],
        name: [null,[Validators.required]],
        price: [null,[Validators.required]],
        description: [null,[Validators.required]]
      })

      this.getAllCategories();
    }


    getAllCategories(){
      this.adminService.getAllCateogry().subscribe(
        res =>{
          this.listOfCategories =res;
        }
      )
    }

    
addProduct():void{
  
  if(this.productForm.valid)
    {
      // const  formData:  FormData = new FormData();
      // console.log('Selected File:', this.selectedFile);
      // console.log('Category ID:', this.productForm.get('categoryId').value);
      // console.log('Name:', this.productForm.get('name').value);
      // console.log('Description:', this.productForm.get('description').value);
      // console.log('Price:', this.productForm.get('price').value);
  
      //formData.append('byteimg',this.selectedFile);
      // formData.append('categoryId',this.productForm.get('categoryId').value);
      // formData.append('name',this.productForm.get('name').value);
      // formData.append('description',this.productForm.get('description').value);
      // formData.append('price',this.productForm.get('price').value);


      // this.productDto.byteimage=this.selectedFile;
      // this.productDto.categoryId=this.productForm.get('categoryId').value;
      // this.productDto.name=this.productForm.get('name').value;
      // this.productDto.description=this.productForm.get('description').value;
      // this.productDto.price=this.productForm.get('price').value;
      
     
        this.productDto.stringImg = this.imagePreview.split(',')[1] as string;
        this.productDto.categoryId=this.productForm.get('categoryId').value;
        this.productDto.name=this.productForm.get('name').value;
        this.productDto.description=this.productForm.get('description').value;
        this.productDto.price=this.productForm.get('price').value;

        this.adminService.addProduct(this.productDto).subscribe(
          res => {
            if (res.id != null) {
              this.snackBar.open('Product posted successfully!', 'Close', { duration: 5000 });
              this.router.navigateByUrl('admin/dashboard');
            } else {
              this.snackBar.open(res.message, 'ERROR', { duration: 5000 });
            }
          }
        );
      
   
      // this.adminService.addProduct(this.productDto).subscribe(
      //   (res) =>
      //     {
      //       if(res.id !=null)
      //         {
      //           this.snackBar.open('Product posted successfully!','Close',
      //             {
      //               duration:5000
      //             }
      //           );
      //           this.router.navigateByUrl('admin/dashboard')
      //         }else
      //         {
      //           this.snackBar.open(res.message,'ERROR',
      //             {
      //               duration:5000
      //             })
      //         }

      //     }
      // )
    }else{
      for(const i  in this.productForm.controls)
        {
          this.productForm.controls[i].markAsDirty();
          this.productForm.controls[i].updateValueAndValidity();
        }
    }
  }

}
