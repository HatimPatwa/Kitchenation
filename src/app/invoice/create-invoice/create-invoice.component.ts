import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  invoiceForm: FormGroup = new FormGroup({
    customerName: new FormControl('', Validators.required),
    customerAddress: new FormControl('', Validators.required),
    customerPhone: new FormControl('', Validators.required),
    customerEmail: new FormControl('', Validators.required),
    invoiceNumber: new FormControl('', Validators.required),
    invoiceDate: new FormControl(new Date(), Validators.required),
    dueDate: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.required),
    netTotal: new FormControl(0, Validators.required),
    products: new FormArray([
      new FormGroup({
        name: new FormControl('', Validators.required),
        quantity: new FormControl(1, Validators.required),
        rate: new FormControl(0, Validators.required),
        netAmount: new FormControl(52.23, Validators.required),
      })
    ])
  });

  get products() {
    return this.invoiceForm.get('products') as FormArray;
  }


  addProduct() {
    const products = this.invoiceForm.get('products') as FormArray;
    products.push(new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl(1, Validators.required),
      rate: new FormControl(0, Validators.required),
      netAmount: new FormControl(0.00, Validators.required),
    }));

     console.log();

  }

  saveInvoice(data: any) {
    console.log(data);
  }

  removeProduct(index: number) {
    const products = this.invoiceForm.get('products') as FormArray;
    products.removeAt(index);
  }



}
