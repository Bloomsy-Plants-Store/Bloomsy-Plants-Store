import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config';
@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private Base_URL = `${config.backendUrl}/user/order/`;
  http: any;
  // public orderUpdatedSubject: Subject<void> = new Subject<void>();
  // public orderUpdated: Observable<void> = this.orderUpdatedSubject.asObservable();


  constructor(private readonly myClient : HttpClient) { }

  GetOrdersByUserID(userID: number) {
    return this.myClient.get(this.Base_URL+"get-orders/"+userID);
  }

  makeOrder(userID: number, total_price: number, products: any) {
    console.log(userID,total_price,products)
    return this.myClient.post(this.Base_URL + userID, { total_price, products });
  }

  confirmOrder(orderID: number,userID: number) {
    return this.myClient.post(this.Base_URL + "confirm-order" , {orderID,userID});
  }
  deliverOrder(orderID: number,userID: number) {
    return this.myClient.post(this.Base_URL + "deliver-order" , {orderID,userID});
  }

  getOrders() {
    return this.myClient.get<any[]>(this.Base_URL + 'get-pending-orders');
  }

}

