import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config';
@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private Base_URL = `${config.backendUrl}/user/order/`;
  http: any;

  constructor(private readonly myClient : HttpClient) { }

  GetOrdersByUserID(userID: number) {
    return this.myClient.get(this.Base_URL+"get-orders/"+userID);
  }

  makeOrder(userID: number, total_price: number, products: any) {
    console.log(userID,total_price,products)
    return this.myClient.post(this.Base_URL + userID, { total_price, products });
  }

  cancelOrder(userID: number,orderID: any) {
    return this.myClient.post(this.Base_URL + "cancel-order/" + userID, { orderId: orderID });
  }


}

