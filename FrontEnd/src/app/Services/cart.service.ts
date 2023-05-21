import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private Base_URL = "http://localhost:7400/users/"
  constructor(private readonly myClient: HttpClient) { }

  GetAllProductsInCart() {
    return this.myClient.get(this.Base_URL+JSON.parse(localStorage.getItem('access_token')!).UserId+"/cart")
  }
}
