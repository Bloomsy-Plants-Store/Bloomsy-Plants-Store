import { AfterViewInit, ChangeDetectorRef, Component, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../../../Services/products.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-all-products-table-pagination',
  styleUrls: ['all-products-table-pagination.component.css'],
  templateUrl: 'all-products-table-pagination.component.html',
})
export class AllProductsTablePaginationComponent implements AfterViewInit {
  selectedID:any;
  errorMessage:any;
  successMessage:any;
   displayedColumns: string[] = ['name','price', 'category','discount','itemsinStock','action'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  editProductForm: FormGroup;
  editProductID: any = '';
  oldCategory:any = [];
  oldImages:any = [];

  constructor(private productsService: ProductsService,private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder, private spinner: NgxSpinnerService) {
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

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchAllProducts();
  }

  async fetchAllProducts() {
    try {
      this.spinner.show();
      const data: any = await this.productsService.GetAllProducts().toPromise();
      this.dataSource.data = data.data;
      console.log('After assignment:', this.dataSource.data );
      this.changeDetectorRef.detectChanges();
      this.spinner.hide();
    } catch (error) {
      console.log('Error fetching products:', error);
      this.spinner.hide();
    }
  }

  editElement(element: PeriodicElement) {
    this.spinner.show();
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
        this.spinner.hide();
      },
      error: (err:any) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }

  updateProduct(){
    this.spinner.show();
    if (this.editProductForm.valid) {

      this.oldCategory.push(...this.productCategory?.value);

      for (let i = 0; i < this.oldImages.length; i++) {
        this.editProductForm.value.productImages.push(this.oldImages[i]);
      }

      this.productsService.UpdateProduct(this.editProductID, this.editProductForm.value).subscribe({
        next:(response) => {
          console.log(response);
          this.spinner.hide();
        },
        error:(err) => {
          console.error(err);
          this.spinner.hide();
        }
      })

    }else {
      console.log('Invalid Data Format,Please Try Again');
      this.spinner.hide();
    }
  }

  onFileInputChange(event: any) {
    const files = event.target.files;
    const fileArray = Array.from(files);

    for (let i = 0; i < fileArray.length; i++) {
      this.oldImages.push(new FormControl(fileArray[i]));
    }
  }

  setSelectedId(id:number)
  {
    this.selectedID=id;
  }

  deletedSelectedProduct() {
    const token = localStorage.getItem('x-auth-token');
    this.productsService.DeleteProductById(this.selectedID,token).subscribe({
      next: (response: any) => {
        console.log(token);
        this.fetchAllProducts();
        this.successMessage='This product deleted Successfully.';
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Deleting this product failed. Please try again.';
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
      }
    });
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









