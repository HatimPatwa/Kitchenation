import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allInventory: Array<any> = [];

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
  }


  getAllInventory() {
    this.inventoryService.getInventory().subscribe((res: any) => {
      this.allInventory = res.data;
    });
  }

  deleteInventory(id: any) {
    this.inventoryService.deleteInventory(id).subscribe((res: any) => {
      this.getAllInventory();
    });
  }

  

}
