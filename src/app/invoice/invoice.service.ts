import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getInventory() {
    return this.http.get(this.url + 'inventory');
  };

}
