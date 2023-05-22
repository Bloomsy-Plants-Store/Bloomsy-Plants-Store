import { Component, ElementRef, OnInit } from '@angular/core';
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
  constructor(private elementRef: ElementRef, public myService: ProductsService, public myCartService:CartService ) { }

  ngOnInit(): void {

    this.myService.GetAllProducts().subscribe({
      next: (response: any) => {
        this.Products = response.data;
        console.log(this.Products);
        this.totalItems= this.Products.length;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  getUpperBound(): number {
    const upperBound = (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage;
    return Math.min(upperBound, this.totalItems);
  }

  // add product to cart
  addProductToCart(id:any, price:any) {
    let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
    this.myCartService.addProductToCart(userId, id,price).subscribe({
      next: (response: any) => { },
      error: (err:any) => {
        console.log(err);
      }
    });

  }
}
