import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-dashboard-all-products',
  templateUrl: './dashboard-all-products.component.html',
  styleUrls: ['./dashboard-all-products.component.css']
})
export class DashboardAllProductsComponent {
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService: ProductsService) {
    this.productForm = this.formBuilder.group({
      name: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
      discount: new FormControl(),
      itemsinStock: new FormControl(),
      category: new FormControl(),
      imageUrl: this.formBuilder.array([]),
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      const files = this.productForm.get('imageUrl')?.value;

      for (let i = 0; i < files.length; i++) {
        formData.append('imageUrl', files[i]);
      }

      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);

      let category = this.productForm.get('category')?.value
      for (let i = 0; i < category.length; i++) {
        formData.append('category', category[i]);
      }

      formData.append('itemsinStock', this.productForm.get('itemsinStock')?.value);
      formData.append('discount', this.productForm.get('discount')?.value);
      this.productService.StoreProduct(formData).subscribe(
        (response) => {
          // Handle the response from the API if needed
          console.log(response);
        },
        (error) => {
          // Handle error if the API request fails
          console.error(error);
        }
      );
    }
  }

  onFileInputChange(event: any) {
    const files = event.target.files;
    const fileArray = Array.from(files);

    let productImagesControl = this.productForm.get('imageUrl') as FormArray;
    for (let i = 0; i < fileArray.length; i++) {
      productImagesControl.push(new FormControl(fileArray[i]));
    }
  }

}
