import { Component, OnInit, OnDestroy } from '@angular/core';
import { io } from 'socket.io-client';
import { AuthService } from 'src/app/Services/auth.service';
import { config } from 'src/app/config';

const socket: any = io(config.backendUrl, {
  path: "/notification/",
  transports: ['websocket']
});
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent {
  user = JSON.parse(localStorage.getItem('access_token')!);
  UserId = this.user.UserId;
  UserName = this.user.UserName;
  notification: Number | undefined;
  notifications: any = [];

  constructor(readonly authService: AuthService) {
    socket.on('connection', () => {

    });
    const params = {
      sender: this.UserId,
    }
    socket.emit('joinNotifications', params, () => {
    });

    socket.on('recieveNotifications', (request: any) => {
      this.notifications.push(request);
      this.notification = this.notifications.length;
    })
  }

  actionOnRequest(button: any) {
    socket.emit('sendNotifications', {
      message: `You clicked on ${button}.`,
      sender: this.UserName,
      reciever: this.UserName
    }, () => {

    })
    console.log(this.notifications)
  }

}
