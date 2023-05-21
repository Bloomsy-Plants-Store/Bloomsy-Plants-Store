import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private Base_URL = "http://localhost:7400/api/products/";

  constructor(private readonly myClient : HttpClient) { }

  GetAllProducts(){
    return this.myClient.get(this.Base_URL);
  }
  GetTopRating(){
    return this.myClient.get(this.Base_URL+"topRating?limit=8");
  }
  GetBestSelling(){
    return this.myClient.get(this.Base_URL+"bestSelling?limit=4");
  }
  GetProductByID(productId: number) {
    return this.myClient.get(this.Base_URL+productId);
  }
  UpdateProduct(productId: number, data: any): Observable<any> {
    console.log(data)
    return this.myClient.put(this.Base_URL + "update/" + productId, data);
  };

  DeleteProductById(id:any){
    return this.myClient.delete(this.Base_URL+id);
  }
}

