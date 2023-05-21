import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../../../Services/products.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-all-products-table-pagination',
  styleUrls: ['all-products-table-pagination.component.css'],
  templateUrl: 'all-products-table-pagination.component.html',
})
export class AllProductsTablePaginationComponent implements AfterViewInit {
  displayedColumns: string[] = ['name','price', 'category','discount','itemsinStock','action'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  editProductForm: FormGroup;
  editProductID: any = '';
  oldCategory:any = [];
  oldImages:any = [];

  constructor(private productsService: ProductsService,private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder,) {
    this.editProductForm = this.fb.group({
      productName: new FormControl('',[Validators.required]),
      productDesc: new FormControl('',[Validators.required]),
      productDiscount: new FormControl('',[Validators.required]),
      productPrice: new FormControl('',[Validators.required]),
      productItemsInStock: new FormControl('',[Validators.required]),
      productCategory: new FormControl(),
      productImages: this.fb.array([])
    });
  }
  get productId(){
    return this.editProductForm.get('productId');
  }
  get productName(){
    return this.editProductForm.get('productName');
  }
  get productDesc(){
    return this.editProductForm.get('productDisc');
  }
  get productDiscount(){
    return this.editProductForm.get('productDiscount');
  }
  get productPrice(){
    return this.editProductForm.get('productPrice');
  }
  get productItemsInStock(){
    return this.editProductForm.get('productItemsInStock');
  }
  get productCategory(){
    return this.editProductForm.get('productCategory');
  }
  get productImages(){
    return this.editProductForm.get('productImages');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchAllProducts();
  }

  async fetchAllProducts() {
    try {
      const data: any = await this.productsService.GetAllProducts().toPromise();
      this.dataSource.data = data.data;
      console.log('After assignment:', this.dataSource.data );
      this.changeDetectorRef.detectChanges();
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  }

  async fetchProductByID(id:any) {
    try {
      const product: any = await this.productsService.GetProductByID(id).toPromise();
      return product.data;;
    } catch (error) {
      console.log('Error Fetching Product Details:', error);
    }
  }

  deleteElement(element: PeriodicElement) {
    // Implement the logic to delete the element
  }

  editElement(element: PeriodicElement) {
    const productId = element._id;
    this.productsService.GetProductByID(productId).subscribe({
      next: (product: any) => {

        this.editProductForm.setValue({
          productName: product.data.name,
          productDesc: product.data.description,
          productDiscount: Number(product.data.discount),
          productPrice: Number(product.data.price),
          productItemsInStock: Number(product.data.itemsinStock),
          productCategory: product.data.category,
          productImages: []
        });
        this.editProductID = productId;
        this.oldCategory = [];
      },
      error: (err:any) => {
        console.log(err)
      },
    });
  }

  updateProduct(){
    if (this.editProductForm.valid) {

      this.oldCategory.push(...this.productCategory?.value);

      for (let i = 0; i < this.oldImages.length; i++) {
        this.editProductForm.value.productImages.push(this.oldImages[i]);
      }
      
      this.productsService.UpdateProduct(this.editProductID, this.editProductForm.value).subscribe({
        next:(response) => {
          console.log(response);
        },
        error:(err) => {
          console.error(err);
        }
      })

    }else {
      console.log('Invalid Data Format,Please Try Again');
    }
  }

  onFileInputChange(event: any) {
    const files = event.target.files;
    const fileArray = Array.from(files);

    for (let i = 0; i < fileArray.length; i++) {
      this.oldImages.push(new FormControl(fileArray[i]));
    }
  }
}

interface PeriodicElement {
  _id:any,
  name:String,
  price:Number,
  imageUrl:[String],
  category:[String],
  rate:Number,
  reviews_num:Number,
  discount:Number,
  bestSelling:Boolean,
  description: String,
  itemsinStock: Number,
  action:any,
}









