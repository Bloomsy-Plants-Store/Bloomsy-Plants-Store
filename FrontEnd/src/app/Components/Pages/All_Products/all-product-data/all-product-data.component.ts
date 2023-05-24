import { Component, ElementRef, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/Services/products.service';
import { CartService } from 'src/app/Services/cart.service';
import { Router } from '@angular/router';
import {CartDetailsComponent} from "../../../Pages/cart/cart-details/cart-details.component"

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
  constructor(private elementRef: ElementRef, public myService: ProductsService, public myCartService:CartService, private spinner: NgxSpinnerService,private router: Router) { }

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
  addProductToCart(id:any, price:any) {
    this.spinner.show();
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Redirect to login page
      this.router.navigate(['/login']);
      return;
    }
    const userId = JSON.parse(accessToken).UserId;
    if (!userId) {
      // Invalid access token, redirect to login page
      this.router.navigate(['/login']);
      return;
    }
    let userToken = localStorage.getItem('x-auth-token');
    this.myCartService.addProductToCart(userId, id, price, userToken)
      .subscribe({
        next: (response: any) => {
          // this.cartDetailsComponent.getCartTotalItems();
          this.spinner.hide();
        },
        error: (err:any) => {
          console.log(err);
          this.spinner.hide();
        }
    });
  }



}
