import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {CustomersComponent} from "./components/customers/customers.component";
import {ItemsComponent} from "./components/items/items.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {CommonModule, NgClass} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CustomersComponent, ItemsComponent, OrdersComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentPage: string = 'customers';

  changePage(pageName: string){
    this.currentPage = pageName;
  }
}
