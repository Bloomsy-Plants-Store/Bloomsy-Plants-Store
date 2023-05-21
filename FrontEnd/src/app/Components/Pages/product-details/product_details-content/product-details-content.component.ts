import { Component, ElementRef, ViewChild } from '@angular/core';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/Services/products.service';
import { CartService } from 'src/app/Services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details-content',
  templateUrl: './product-details-content.component.html',
  styleUrls: ['./product-details-content.component.css']
})
export class ProductDetailsComponent {
  quantity: number = 1;
  isFavorited: boolean = false;
  Product: any;


  constructor(private elementRef: ElementRef,
    public productService: ProductsService,
    public cartService:CartService,
    private route: ActivatedRoute) { }

  @ViewChild('carousel') carousel?: CarouselComponent;


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = params['id'];

      this.productService.GetProductByID(productId).subscribe({
        next: (response: any) => {
          this.Product = response.data;
          console.log(this.Product);
        },
        error: (err:any) => {
          console.log(err);
        }
      });
    });
  }

  addProductToCart(id: any,itemQuantity:number) {
    console.log(itemQuantity);
    let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
    this.cartService.addProductToCart(userId, id,itemQuantity).subscribe({
      next: (response: any) => { },
      error: (err: any) => {
        console.log(err);
      }
    });
  }


  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  toggleFavorite(): void {
    this.isFavorited = !this.isFavorited;
  }

  getStarsArray(rate: number): any[] {
    const starsCount = Math.floor(rate);
    const isHalfStar = rate % 1 !== 0;

    const starsArray = Array(starsCount).fill(0);

    if (isHalfStar) {
      starsArray.push(0.5);
    }

    return starsArray;
  }

}
