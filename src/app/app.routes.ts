import { Routes } from '@angular/router';
import {ItemsComponent} from "./components/items/items.component";
import {CustomersComponent} from "./components/customers/customers.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {CustomerDetailComponent} from "./components/customer-detail/customer-detail.component";
import {CustomerFormComponent} from "./components/customer-form/customer-form.component";
import {ItemDetailComponent} from "./components/item-detail/item-detail.component";
import {ItemFormComponent} from "./components/item-form/item-form.component";
import {OrderDetailComponent} from "./components/order-detail/order-detail.component";
import {OrderFormComponent} from "./components/order-form/order-form.component";

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },

  // customers
  { path: 'customers', component: CustomersComponent },
  { path: 'customer/detail/:id', component:  CustomerDetailComponent},
  { path: 'customer/add', component: CustomerFormComponent },
  { path: 'customer/edit/:id', component: CustomerFormComponent },

  // items
  { path: 'items', component: ItemsComponent },
  { path: 'item/detail/:id', component:  ItemDetailComponent},
  { path: 'item/add', component: ItemFormComponent },
  { path: 'item/edit/:id', component: ItemFormComponent },

  // orders
  { path: 'orders', component: OrdersComponent },
  { path: 'order/detail/:id', component:  OrderDetailComponent},
  { path: 'order/add', component: OrderFormComponent },
  { path: 'order/edit/:id', component: OrderFormComponent },
];
