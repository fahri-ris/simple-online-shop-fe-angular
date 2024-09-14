import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Items} from "../models/items.model";
import {Customers} from "../models/customers.model";
import {Message} from "../models/message.model";
import {Page} from "../models/page.model";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private baseUrl: string = 'http://localhost:5045/api/items';

  constructor(
    private http: HttpClient
  ) { }

  getItems(): Observable<Items[]> {
    return this.http.get<Items[]>(this.baseUrl);
  }

  getItemsPage(pageIndex: number, pageSize: number, search: string): Observable<Page<Items[]>> {
    let params = new HttpParams()
    .set('pageIndex', pageIndex)
    .set('pageSize', pageSize)
    .set('search', search);

    return this.http.get<Page<Items[]>>(`${this.baseUrl}/pagination`, {params});
  }

  getDetailItem(id: number): Observable<Items> {
    return this.http.get<Items>(`${this.baseUrl}/${id}`);
  }

  createItem(item: Items): Observable<Items> {
    return this.http.post<Items>(this.baseUrl, item);
  }

  updateItem(id: number, item: Items): Observable<Items> {
    return this.http.put<Items>(`${this.baseUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<Message> {
    return this.http.delete<Message>(`${this.baseUrl}/${id}`);
  }
}
