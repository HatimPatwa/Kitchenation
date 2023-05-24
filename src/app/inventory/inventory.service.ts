import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }


  getInventory() {
    return this.http.get(this.url + 'inventory');
  };

  addInventory(data: any) {
    return this.http.post(this.url + 'inventory', data);
  }

  deleteInventory(id: any) {
    return this.http.delete(this.url + 'inventory/' + id);
  }

  getInventoryById(id: any) {
    return this.http.get(this.url + 'inventory/' + id);
  }

  updateInventory(id: any, data: any) {
    return this.http.put(this.url + 'inventory/' + id, data);
  }

}
