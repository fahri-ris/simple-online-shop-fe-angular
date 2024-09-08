import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Orders} from "../../models/orders.model";
import {OrdersService} from "../../services/orders.service";

@Component({
  selector: 'app-orders',
  standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  orderList: Orders[] = [];
  showToast = false;
  toastMessage : string | undefined;

  constructor(
    private router: Router,
    private orderService: OrdersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders(){
    this.orderService.getOrders().subscribe(data => {
      this.orderList = data;
    })
  }

  goToDetail(id: number): void {}

  deleteItem(id: number): void {
    this.orderService.deleteOrder(id).subscribe({
      next: (data) => {
        this.toastMessage = data.message;
        this.showToast = true;
        this.loadOrders();

        setTimeout(() =>{
          this.showToast = false;
        }, 3000)
      },
      error: (error) => {
        console.error('Error deleting customer', error);
        this.toastMessage = error.error;
        this.showToast = true;

        setTimeout(() =>{
          this.showToast = false;
        }, 3000)
      }
    });
  }

  closeToast(){
    this.showToast = false;
  }
}
