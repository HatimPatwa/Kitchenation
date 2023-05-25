import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getInventory() {
    return this.http.get(this.url + 'inventory');
  };

}
