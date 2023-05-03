import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-sample-products',
  templateUrl: './sample-products.component.html',
  styleUrls: ['./sample-products.component.css']
})
export class SampleProductsComponent implements OnInit{
  Products:any;
  constructor(private elementRef: ElementRef,public myService : ProductsService){}

  ngOnInit(): void {
    this.myService.GetAllProducts().subscribe({
      next:(data)=>{
        this.Products = data;
      },
      error:(err)=>{
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
}
