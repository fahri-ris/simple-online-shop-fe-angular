import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Reqpdf} from "../models/reqpdf.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  baseUrl = 'http://localhost:5045/api/file';

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getFile(filename: string | undefined): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${filename}`);
  }
}
