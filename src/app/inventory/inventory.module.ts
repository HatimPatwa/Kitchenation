import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    DashboardComponent,
    AddInventoryComponent,
    EditInventoryComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    TableModule,
    InputTextModule
  ]
})
export class InventoryModule { }
