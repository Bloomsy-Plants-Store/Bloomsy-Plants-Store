import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private Base_URL = "http://localhost:3000/products";

  constructor(private readonly myClient : HttpClient) { }

  GetAllProducts(){
    return this.myClient.get(this.Base_URL);
  }
}
