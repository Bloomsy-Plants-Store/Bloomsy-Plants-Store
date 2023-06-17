import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-dashboard-track-order',
  templateUrl: './dashboard-track-order.component.html',
  styleUrls: ['./dashboard-track-order.component.css']
})
export class DashboardTrackOrderComponent {
  pending: string[] = ['Item 1',  'Item 2', 'Item 3','Item 1', 'Item 2', 'Item 3','Item 1', 'Item 2', 'Item 3'];
  delivers: string[] = [];
  confirmed: string[] = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // Move item within the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Transfer item between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // let orderStatus = this.getOrderStatus(event);
      // let body={"orderStatus":orderStatus}
    }
  }

  // getOrderStatus(event:any){
  //   let orderStatus;
  //   switch(event.container!.id)
  //   {
  //     case "cdk-drop-list-0":
  //       orderStatus="pending";
  //       break;
  //     case "cdk-drop-list-1":
  //       orderStatus="shipped"
  //       break;
  //     case "cdk-drop-list-2":
  //       orderStatus="delivered";
  //       break;
  //   }

  //   return orderStatus;
  // }



}
