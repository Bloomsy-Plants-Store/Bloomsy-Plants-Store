import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/Services/cart.service';
import * as bootstrap from 'bootstrap';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-sample-products',
  templateUrl: './sample-products.component.html',
  styleUrls: ['./sample-products.component.css']
})
export class SampleProductsComponent implements OnInit {
  Products: any;
  topRatingProducts: any;
  bestSellingProducts: any;
  activeFilter: any = null;

  constructor(private elementRef: ElementRef, public myService: ProductsService,private spinner: NgxSpinnerService, public myCartService :CartService, private router:Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.myService.GetTopRating().subscribe({
      next: (response: any) => {
        this.topRatingProducts = response.data;
        this.Products = this.topRatingProducts;
        this.activeFilter = 'top-rate';
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      }
    })
    this.myService.GetBestSelling().subscribe({
      next: (response: any) => {
        this.bestSellingProducts = response.data;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      }
    })

  }
  // Bootstrap Tooltip Intialization
  ngAfterViewInit() {
    const tooltipTriggerList: Element[] = Array.from(this.elementRef.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList: bootstrap.Tooltip[] = tooltipTriggerList.map((tooltipTriggerEl: Element): bootstrap.Tooltip => {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

  }
  filterProductsByBestSelling(filter: string) {
    this.spinner.show();
    this.activeFilter = filter;
    this.Products = this.bestSellingProducts;
    this.spinner.hide();
  }
  filterProductsByTopRating(filter: string) {
    this.spinner.show();
    this.activeFilter = filter;
    this.Products = this.topRatingProducts;
    this.spinner.hide();

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
    console.log(userToken);
    this.myCartService.addProductToCart(userId, id, price, userToken)
      .subscribe({
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
