import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {ItemsService} from "../../services/items.service";
import {Items} from "../../models/items.model";

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent implements OnInit{
  item: Items = <Items>{
    itemsName: "",
    price: 0,
    stock: 0
  }

  isUpdateMode: boolean = false;
  showToast: boolean = false;
  toastMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Check if we're in update mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isUpdateMode = true;
      this.loadItem(id);
    }
  }

  loadItem(id: string): void {
    this.itemService.getDetailItem(Number(id)).subscribe(data => {
      this.item = data;
    });
  }

  goToList(): void {
    this.router.navigate([`/items`]);
  }

  onSubmit(){
    if (this.isUpdateMode) {
      this.itemService.updateItem(this.item.itemId, this.item).subscribe({
        next: () => {
          this.toastMessage = "Update Item Successfully";
          this.showToast = true;
          this.goToList();
        },
        error: error => {
          this.toastMessage = error.error;
          this.showToast = true;
        }
      });
    } else {
      this.itemService.createItem(this.item).subscribe({
        next: () => {
          this.toastMessage = "Add Item Successfully";
          this.showToast = true;
          this.goToList();
        },
        error: error => {
          this.toastMessage = error.error;
          this.showToast = true;
        }
      });
    }

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  isFormValid(): boolean {
    return this.item.itemsName.trim() !== '' && this.item.price > 0 && this.item.stock > 0;
  }

  closeToast(){
    this.showToast = false;
  }
}
