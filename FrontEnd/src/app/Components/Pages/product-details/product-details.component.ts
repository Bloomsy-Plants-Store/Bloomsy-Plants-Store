import { Component, ElementRef, ViewChild } from '@angular/core';
import { CarouselComponent } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  quantity: number = 1;
  isFavorited: boolean = false;

  @ViewChild('carousel') carousel?: CarouselComponent;
  // Rest of your component code

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

}
