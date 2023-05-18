import { Component, ElementRef, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-all-product-data',
  templateUrl: './all-product-data.component.html',
  styleUrls: ['./all-product-data.component.css']
})
export class AllProductDataComponent implements OnInit {
  Products: any;
  topRatingProducts: any;
  bestSellingProducts: any;
  activeFilter: any = null;

  constructor(private elementRef: ElementRef, public myService: ProductsService) { }

  ngOnInit(): void {

    this.myService.GetAllProdducts().subscribe({
      next: (response: any) => {
        this.Products = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
