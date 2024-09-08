import {Component, OnInit} from '@angular/core';
import {Customers} from "../../models/customers.model";
import {CustomersService} from "../../services/customers.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    CommonModule, RouterModule
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent implements OnInit {
  customer?: Customers;

  constructor(private customersService: CustomersService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customersService.getDetailCustomer(Number(id)).subscribe(data => {
        this.customer = data;
      });
    }
  }

}
