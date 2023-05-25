import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InventoryRoutingModule } from './inventory-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [
    DashboardComponent,
    AddInventoryComponent,
    EditInventoryComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    InventoryRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
    InputNumberModule,
    DialogModule,
    InputTextareaModule
  ]
})
export class InventoryModule { }
