import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Items} from "../models/items.model";
import {Customers} from "../models/customers.model";
import {Message} from "../models/message.model";

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
