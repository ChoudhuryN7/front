import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { AdminService } from '../../service/admin.service';
import { CategoryDto } from './CategoryDto';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.css'
})
export class PostCategoryComponent {

categoryForm: FormGroup;


  constructor(  private formbuilder:FormBuilder,
    private authservice:AuthService,
    private snackBar:MatSnackBar,
    private router : Router,
    private adminService:AdminService
  ){}

  ngOnInit(): void {
    this.categoryForm = this.formbuilder.group({
      name: [null, [Validators.required]],    
      description: [null, [Validators.required]],
    });
  }

  categoryDataToAdd:  CategoryDto= new CategoryDto();

  addCategory() {
   if(this.categoryForm.valid)
    {
    this.categoryDataToAdd.name =this.categoryForm.value.name;
    this.categoryDataToAdd.description =this.categoryForm.value.description;
    console.log('---------',this.categoryDataToAdd)
      this.adminService.addCateogry(this.categoryDataToAdd).subscribe(
        (res)=>
          {
            if(res.id !=null){
              this.snackBar.open('Category posted successfully!','Close',
            {
              duration:5000
            });
            this.router.navigateByUrl('/admin/dashboard');
          }
          else{
            this.snackBar.open(res.message,'Close',{duration:5000,panelClass:'error-snackbar'});
          }
          }
      )}
      else{
        this.categoryForm.markAllAsTouched();
      }
    }
}
