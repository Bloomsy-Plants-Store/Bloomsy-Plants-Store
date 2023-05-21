import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';



export interface Product {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {

  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'total'];
  dataSource: Product[] = [
    { name: 'Product 1', price: 10, quantity: 2, total: 20 },
  ];
  decreaseQuantity(element:any) {
    if (element.quantity > 1) {
      element.quantity--;
    }
  }

  increaseQuantity(element:any) {
    element.quantity++;
  }
}
