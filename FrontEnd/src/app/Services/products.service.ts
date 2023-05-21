import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private Base_URL = "http://localhost:7400/api/products/";
  http: any;

  constructor(private readonly myClient : HttpClient) { }
 
  GetAllProdducts(){
    return this.myClient.get(this.Base_URL);
  }
  GetTopRating(){
    return this.myClient.get(this.Base_URL+"topRating?limit=8");
  }
  GetBestSelling(){
    return this.myClient.get(this.Base_URL+"bestSelling?limit=4");
  }
  StoreProduct(data: FormData): Observable<any> {
    return this.myClient.post(this.Base_URL + "store", data);
  }

}

