import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateInvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    ReactiveFormsModule
  ]
})
export class InvoiceModule { }
