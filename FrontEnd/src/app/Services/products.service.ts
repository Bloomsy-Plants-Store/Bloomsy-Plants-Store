import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private Base_URL = "http://localhost:7400/api/products/";

  constructor(private readonly myClient : HttpClient) { }

  GetTopRating(){
    return this.myClient.get(this.Base_URL+"topRating?limit=6");
  }
}
