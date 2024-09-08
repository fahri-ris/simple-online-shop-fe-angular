import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Customers} from "../../models/customers.model";
import {CustomersService} from "../../services/customers.service";
import {ItemsService} from "../../services/items.service";
import {Items} from "../../models/items.model";

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  itemList: Items[] = [];

  toastLiveExample = document.getElementById('liveToast');

  showToast = false;
  toastMessage:string | undefined;

  constructor(private itemsService: ItemsService, private router: Router) {}

  // method
  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemsService.getItems().subscribe(data => {
      this.itemList = data;
    });
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
