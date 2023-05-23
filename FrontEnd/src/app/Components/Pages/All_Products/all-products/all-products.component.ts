import { Component } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class ALlProductsComponent {
  categoryName:string="";
  getCatgoryName(data:any)
  {
      this.categoryName = data;
      console.log( this.categoryName)
  }
}
