import {ChangeDetectorRef, Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Customers} from "../../models/customers.model";
import {CustomersService} from "../../services/customers.service";
import {ItemsService} from "../../services/items.service";
import {Items} from "../../models/items.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    FormsModule,
    NgClass
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  itemList: Items[] = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  hasPreviousPage: boolean = false;
  hasNextPage: boolean = false;
  search: string = '';

  toastLiveExample = document.getElementById('liveToast');

  showToast = false;
  toastMessage:string | undefined;

  constructor(private itemsService: ItemsService, private router: Router, private cd: ChangeDetectorRef) {}

  // method
  ngOnInit(): void {
    this.loadItems();
  }

  onSearchChange(event: any){
    if (this.search.trim() == ''){
      this.pageIndex = 1;
      this.loadItems();
    }
  }

  loadItems(): void {
    if(this.search !== ''){
      this.pageIndex = 1;
    }
    this.itemsService.getItemsPage(this.pageIndex, this.pageSize, this.search).subscribe(response => {
      this.itemList = response.data;
      this.totalPages = response.totalPages;
      this.hasPreviousPage = response.hasPreviousPage;
      this.hasNextPage = response.hasNextPage;
      this.cd.detectChanges();
    });
  }

  previousPage(): void {
    if (this.hasPreviousPage) {
      this.pageIndex--;
      this.loadItems();
    }
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.pageIndex++;
      this.loadItems();
    }
  }

  goToPage(page: number): void {
    if (page !== this.pageIndex) {
      this.pageIndex = page;
      this.loadItems();
    }
  }

  goToDetail(id: number): void {
    this.router.navigate([`/items/detail`, id]);
  }

  editItem(id: number): void {
    this.router.navigate([`/items/edit/${id}`]);
  }

  deleteItem(id: number): void {
    this.itemsService.deleteItem(id).subscribe({
      next: (response) => {
        this.toastMessage = response.message;
        this.showToast = true;
        this.loadItems();

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
