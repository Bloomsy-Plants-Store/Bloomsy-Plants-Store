import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { config } from '../config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private socket: Socket;

  constructor() {
    // Connect to the server
    this.socket = io(config.backendUrl);

    // Join the 'admin' room as an admin dashboard
    this.socket.emit('joinRoom', 'admin');
  }

  sendOrder(order: any) {
    // Send the order to the server
    this.socket.emit('order', order);
  }

  getNewOrders() {
    // Listen for new order notifications from the server
    return new Observable((observer) => {
      this.socket.on('newOrder', (order) => {
        observer.next(order);
      });
    });
  }
}
