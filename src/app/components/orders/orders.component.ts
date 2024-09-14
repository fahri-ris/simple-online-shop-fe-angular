import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Orders} from "../../models/orders.model";
import {OrdersService} from "../../services/orders.service";
import {Reqpdf} from "../../models/reqpdf.model";
import { saveAs } from 'file-saver';
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-orders',
  standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  orderList: Orders[] = [];
  showToast = false;
  toastMessage : string | undefined;
  reqPdf: Reqpdf = {
    orderId: []
  };
  pageIndex: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  hasPreviousPage: boolean = false;
  hasNextPage: boolean = false;
  search: string = '';

  constructor(
    private router: Router,
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadOrders()
  }

  onSearchChange(event: any){
    if (this.search.trim() == ''){
      this.pageIndex = 1;
      this.loadOrders();
    }
  }

  loadOrders(): void {
    if(this.search !== ''){
      this.pageIndex = 1;
    }
    this.orderService.getOrdersPage(this.pageIndex, this.pageSize, this.search).subscribe(response => {
      this.orderList = response.data;
      this.totalPages = response.totalPages;
      this.hasPreviousPage = response.hasPreviousPage;
      this.hasNextPage = response.hasNextPage;
      this.cd.detectChanges();
    });
  }

  previousPage(): void {
    if (this.hasPreviousPage) {
      this.pageIndex--;
      this.loadOrders();
    }
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.pageIndex++;
      this.loadOrders();
    }
  }

  goToPage(page: number): void {
    if (page !== this.pageIndex) {
      this.pageIndex = page;
      this.loadOrders();
    }
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

  exportPdf() {
    for(let order of this.orderList) {
      this.reqPdf.orderId.push(order.orderId);
    }

    this.orderService.downloadPdf(this.reqPdf).subscribe({
      next: (response) => {
        // Create a Blob from the PDF Stream
        const blob = new Blob([response], { type: 'application/pdf' });

        // Use FileSaver.js to save the file
        saveAs(blob, 'Order.pdf');
      },
      error: (error) => {
        console.error('Error downloading PDF', error);
        // Handle error appropriately
      }
    });
  }
}
