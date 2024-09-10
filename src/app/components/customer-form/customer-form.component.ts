import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Customers} from "../../models/customers.model";
import {CustomersService} from "../../services/customers.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FileuploadService} from "../../services/fileupload.service";

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {
  customer: Customers = <Customers>{
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    isActive: false,
    pic: ''
  };

  imageFile: any = {
    filename: '',
    url: ''
  }

  formSubmitted = false;
  isUpdateMode = false;
  toastMessage: string | undefined;
  showToast: boolean = false;

  constructor(private customersService: CustomersService, private router: Router, private route: ActivatedRoute, private fileUploadService: FileuploadService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isUpdateMode = true;
      this.loadCustomer(id);
    }
  }

  loadCustomer(id: string): void {
    this.customersService.getDetailCustomer(Number(id)).subscribe(data => {
      this.customer = data;
    });
  }

  goToList(): void {
    this.router.navigate([`/customers`]);
  }

  fileSelected(event: any){
    const file: File = event.target.files[0];

    if(file){
      this.fileUploadService.uploadFile(file).subscribe({
        next: (data) => {
          this.imageFile = data;
          this.customer.pic = this.imageFile.filename;
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }

  onSubmit(){
    if (this.isUpdateMode) {
      this.customersService.updateCustomer(this.customer.customerId, this.customer).subscribe({
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
      this.customersService.createCustomer(this.customer).subscribe({
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
    return this.customer.customerName.trim() !== '' &&
      this.customer.customerAddress.trim() !== '' &&
      this.customer.customerPhone.trim() !== '' &&
      this.customer.pic.trim() !== '';
  }

  closeToast(){
    this.showToast = false;
  }
}
