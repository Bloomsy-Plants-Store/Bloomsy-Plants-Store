import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { CartService } from 'src/app/Services/cart.service';
import * as bootstrap from 'bootstrap';


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

  constructor(private elementRef: ElementRef, public myService: ProductsService, public myCartService :CartService) { }

  ngOnInit(): void {

    this.myService.GetTopRating().subscribe({
      next: (response: any) => {
        this.topRatingProducts = response.data;
        this.Products = this.topRatingProducts;
        this.activeFilter = 'top-rate';
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.myService.GetBestSelling().subscribe({
      next: (response: any) => {
        this.bestSellingProducts = response.data;
      },
      error: (err) => {
        console.log(err);
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
    this.activeFilter = filter;
    this.Products = this.bestSellingProducts;
  }
  filterProductsByTopRating(filter: string) {
    this.activeFilter = filter;
    this.Products = this.topRatingProducts;
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
