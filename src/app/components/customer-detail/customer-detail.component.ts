import {Component, OnInit} from '@angular/core';
import {Customers} from "../../models/customers.model";
import {CustomersService} from "../../services/customers.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FileuploadService} from "../../services/fileupload.service";

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
  customer: Customers = <Customers>{
    customerId: 0,
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

  constructor(private customersService: CustomersService, private router: Router, private route: ActivatedRoute,
              private fileUploadService: FileuploadService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customersService.getDetailCustomer(Number(id)).subscribe(data => {
        this.customer = data;

        if (this.customer.pic) {
          this.fileUploadService.getFile(this.customer.pic).subscribe(fileData => {
            this.imageFile = fileData;
            this.customer.pic = this.imageFile.url;
          });
        }
      });
    }
  }

}
