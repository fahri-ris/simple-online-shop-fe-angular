import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Orders} from "../models/orders.model";
import {Message} from "../models/message.model";
import {Lov} from "../models/lov.model";
import {Reqpdf} from "../models/reqpdf.model";
import {Page} from "../models/page.model";
import {Items} from "../models/items.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl: string =  'http://localhost:5045/api/order';
  private baseUrlLov: string =  'http://localhost:5045/api/lov';

  constructor(
    private http: HttpClient
  ) { }

  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.baseUrl);
  }

  getOrdersPage(pageIndex: number, pageSize: number, search: string): Observable<Page<Orders[]>> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize)
      .set('search', search);

    return this.http.get<Page<Orders[]>>(`${this.baseUrl}/pagination`, {params});
  }

  getDetailOrder(id: number): Observable<Orders> {
    return this.http.get<Orders>(`${this.baseUrl}/${id}`);
  }

  createOrder(order: Orders): Observable<Orders> {
    return this.http.post<Orders>(this.baseUrl, order);
  }

  updateOrder(id: number, order: Orders): Observable<Orders> {
    return this.http.put<Orders>(`${this.baseUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<Message> {
    return this.http.delete<Message>(`${this.baseUrl}/${id}`);
  }

  getLovCustomer(): Observable<Lov[]> {
    return this.http.get<Lov[]>(`${this.baseUrlLov}/customers`);
  }
  getLovItem(): Observable<Lov[]> {
    return this.http.get<Lov[]>(`${this.baseUrlLov}/items`);
  }

  downloadPdf(reqPdf: Reqpdf): Observable<Blob> {
    return this.http.post<Blob>(`${this.baseUrl}/download-pdf`, reqPdf, {
      responseType: 'blob' as 'json'
    });
  }
}
