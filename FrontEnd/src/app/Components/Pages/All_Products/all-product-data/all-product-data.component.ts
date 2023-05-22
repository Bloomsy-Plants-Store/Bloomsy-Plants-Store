import { Component, ElementRef, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/Services/products.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-all-product-data',
  templateUrl: './all-product-data.component.html',
  styleUrls: ['./all-product-data.component.css']
})
export class AllProductDataComponent implements OnInit {
  Products: any;
  currentPage = 1; // Current page number
  itemsPerPage = 12; // Number of items to display per page
  totalItems=0;
  constructor(private elementRef: ElementRef, public myService: ProductsService, public myCartService:CartService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.myService.GetAllProducts().subscribe({
      next: (response: any) => {
        this.Products = response.data;
        console.log(this.Products);
        this.totalItems= this.Products.length;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      }
    })
  }
  getUpperBound(): number {
    const upperBound = (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage;
    return Math.min(upperBound, this.totalItems);
  }

  // add product to cart
  addProductToCart(id:any) {
    this.spinner.show();
    let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
    this.myCartService.addProductToCart(userId, id).subscribe({
      next: (response: any) => {
        this.spinner.hide();
      },
      error: (err:any) => {
        console.log(err);
        this.spinner.hide();
      }
    });

  }
}
