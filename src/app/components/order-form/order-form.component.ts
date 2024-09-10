import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {OrdersService} from "../../services/orders.service";
import {Orders} from "../../models/orders.model";
import {Lov} from "../../models/lov.model";

@Component({
  selector: 'app-order-form',
  standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit{
  order: Orders = <Orders>{
    customerId: 0,
    customerName: "",
    itemsId: 0,
    itemsName: "",
    quantity: 0
  }
  lovCustomer: Lov[] = [];
  lovItem: Lov[] = [];
  selectedCustomer: string = '';
  selectedItem: string = '';
  isUpdateMode: boolean = false;
  toastMessage: string | undefined;
  showToast: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private orderService: OrdersService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef) {}

  ngOnInit() {
     const id = this.route.snapshot.paramMap.get('id');
     if(id){
       this.isUpdateMode = true;
       this.loadOrder(id);
     }
  }

  loadOrder(id: string){
    this.orderService.getDetailOrder(Number(id)).subscribe(data => {
      this.order = data;
      this.selectedCustomer = data.customerName;
      this.selectedItem = data.itemsName;
      this.cd.detectChanges();
    })
  }

  getListCustomer(){
    this.orderService.getLovCustomer().subscribe(data => {
      this.lovCustomer = data;
    })
  }

  getListItem(){
    this.orderService.getLovItem().subscribe(data => {
      this.lovItem = data;
    })
  }

  goToList(){
    this.router.navigate(['/orders']);
  }

  onSubmit(){
    if (this.isUpdateMode) {
      this.orderService.updateOrder(this.order.orderId, this.order).subscribe({
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
      this.orderService.createOrder(this.order).subscribe({
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
    return this.order.customerId > 0 &&
      this.order.itemsId > 0 &&
      this.order.quantity > 0;
  }

  closeToast(){
    this.showToast = false;
  }

  selectCustomer(id: number, data: string){
    this.selectedCustomer = data;
    this.order.customerId = id;
    this.order.customerName = data;
  }

  selectItem(id: number, data: string){
    this.selectedItem = data;
    this.order.itemsId = id;
    this.order.itemsName = data;
  }
}
