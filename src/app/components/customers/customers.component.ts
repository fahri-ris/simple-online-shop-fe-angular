import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router, RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {Customers} from "../../models/customers.model";
import {CustomersService} from "../../services/customers.service";

declare var bootstrap: any;

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule, RouterOutlet],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customerList: Customers[] = [];
  customer?: Customers;

  toastLiveExample = document.getElementById('liveToast');

  showToast = false;
  toastMessage:string | undefined;

  constructor(private customersService: CustomersService, private router: Router) {}

  // method
  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customersService.getCustomers().subscribe(data => {
      this.customerList = data;
    });
  }

  goToDetail(id: number): void {
    this.router.navigate([`/customers/detail`, id]);
  }

  editCustomer(id: number): void {
    this.router.navigate([`/customers/edit/${id}`]);
  }

  deleteCustomer(id: number): void {
    this.customersService.deleteCustomer(id).subscribe({
      next: (response) => {
        this.toastMessage = response.message;
        this.showToast = true;
        this.loadCustomers();

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
