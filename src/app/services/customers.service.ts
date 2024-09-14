import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Customers} from "../models/customers.model";
import {Message} from "../models/message.model";
import {Page} from "../models/page.model";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private baseUrl = 'http://localhost:5045/api/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customers[]> {
    return this.http.get<Customers[]>(this.baseUrl);
  }

  getCustomersPage(pageIndex: number, pageSize: number, search: string): Observable<Page<Customers[]>> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize)
      .set('search', search);

    return this.http.get<Page<Customers[]>>(`${this.baseUrl}/pagination`, {params});
  }

  getDetailCustomer(id: number): Observable<Customers> {
    return this.http.get<Customers>(`${this.baseUrl}/${id}`);
  }

  createCustomer(customer: Customers): Observable<Customers> {
    return this.http.post<Customers>(this.baseUrl, customer);
  }

  updateCustomer(id: number, customer: Customers): Observable<Customers> {
    return this.http.put<Customers>(`${this.baseUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<Message> {
    return this.http.delete<Message>(`${this.baseUrl}/${id}`);
  }
}
