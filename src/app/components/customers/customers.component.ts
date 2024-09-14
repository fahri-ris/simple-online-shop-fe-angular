import {ChangeDetectorRef, Component, inject, input, OnInit} from '@angular/core';
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
  pageIndex: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  hasPreviousPage: boolean = false;
  hasNextPage: boolean = false;
  search: string = '';

  toastLiveExample = document.getElementById('liveToast');

  showToast = false;
  toastMessage:string | undefined;

  constructor(private customersService: CustomersService, private router: Router, private cd: ChangeDetectorRef) {}

  // method
  ngOnInit(): void {
    this.loadCustomers();
  }

  onSearchChange(event: any){
    if (this.search.trim() == ''){
      this.pageIndex = 1;
      this.loadCustomers();
    }
  }

  loadCustomers(): void {
    if(this.search !== ''){
      this.pageIndex = 1;
    }
    this.customersService.getCustomersPage(this.pageIndex, this.pageSize, this.search).subscribe(response => {
      this.customerList = response.data;
      this.totalPages = response.totalPages;
      this.hasPreviousPage = response.hasPreviousPage;
      this.hasNextPage = response.hasNextPage;
      this.cd.detectChanges();
    });
  }

  previousPage(): void {
    if (this.hasPreviousPage) {
      this.pageIndex--;
      this.loadCustomers();
    }
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.pageIndex++;
      this.loadCustomers();
    }
  }

  goToPage(page: number): void {
    if (page !== this.pageIndex) {
      this.pageIndex = page;
      this.loadCustomers();
    }
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

  protected readonly input = input;
}
