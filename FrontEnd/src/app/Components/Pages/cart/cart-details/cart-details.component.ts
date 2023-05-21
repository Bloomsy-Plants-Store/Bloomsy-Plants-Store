import { Component , OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from 'src/app/Services/cart.service';


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
export class CartDetailsComponent implements OnInit{

  constructor( public myService: CartService) { }

  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'total', 'delete'];

  dataSource: Product[] = [];
  decreaseQuantity(element:any) {
    if (element.quantity > 1) {
      element.quantity--;
    }
  }

  increaseQuantity(element:any) {
    element.quantity++;
  }
  removeCartItem(element: any) { }

  ngOnInit(): void {
    this.myService.GetAllProductsInCart().subscribe({
      next: (response: any) => {
        this.dataSource = response.cart;
       console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
   })
  }

}
