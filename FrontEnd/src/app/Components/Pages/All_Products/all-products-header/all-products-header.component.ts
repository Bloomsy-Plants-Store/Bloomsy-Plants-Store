import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-all-products-header',
  templateUrl: './all-products-header.component.html',
  styleUrls: ['./all-products-header.component.css']
})
export class AllProductsHeaderComponent {
  customOptions: OwlOptions = {
    margin: 5,
    items: 3,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4,
      }
    },
    nav: true
  }
  categories = [
    {
      id:"0",
      name: "Low Maintenance",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-11.jpg"
    },
    {
      id:"1",
      name: "Indoor Plants",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-10.jpg"
    },
    {
      id:"2",
      name: "Ceramic Pots",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-8.jpg"
    },
    {
      id:"3",
      name: "Air Purifying",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-7.jpg"
    },
    {
      id:"4",
      name: "Plant Bundle",
      img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-12.jpg"
    }
  ]
}
