import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {OrdersService} from "../../services/orders.service";
import {Orders} from "../../models/orders.model";

@Component({
  selector: 'app-order-detail',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
  order?: Orders;

  constructor(
    private orderService: OrdersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.orderService.getDetailOrder(id).subscribe(data => {
      this.order = data;
    })
  }


}
