import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  url: string = environment.baseUrl;
  constructor(private http: HttpClient) { }


  getInventory() {
    return this.http.get(this.url + 'inventory');
  };

  addInventory(data: any) {
    console.log('add', data);
    return this.http.post(this.url + 'inventory', data);
  }

  deleteInventory(id: any) {
    return this.http.delete(this.url + 'inventory/' + id);
  }

  getInventoryById(id: any) {
    return this.http.get(this.url + 'inventory/' + id);
  }

  updateInventory(data: any) {
    console.log('edit', data);
    return this.http.put(this.url + 'inventory', data);
  }

}
