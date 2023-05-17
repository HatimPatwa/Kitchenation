import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

const countries = require('src/assets/countries.json');

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  countries: Array<any> = countries;
  states: Array<string> = [];

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getStates();
  }

  invoiceForm: FormGroup = new FormGroup({
    customerName: new FormControl('', Validators.required),
    customerAddress: new FormControl('', Validators.required),
    customerCountry: new FormControl('India', Validators.required),
    customerState: new FormControl('', Validators.required),
    customerPhone: new FormControl('', Validators.required),
    customerEmail: new FormControl('', Validators.required),
    invoiceNumber: new FormControl('', Validators.required),
    invoiceDate: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
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

  public getStates() {
    const country = this.invoiceForm.get('customerCountry')?.value;
    this.states = this.countries.find((cntry: any) => cntry.country == country).states;
    this.invoiceForm.patchValue({ 'customerState': this.states[0] });
  }


  addProduct() {
    const products = this.invoiceForm.get('products') as FormArray;
    products.push(new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl(1, Validators.required),
      rate: new FormControl(0, Validators.required),
      netAmount: new FormControl(0.00, Validators.required),
    }));


  }


  removeProduct(index: number) {
    const products = this.invoiceForm.get('products') as FormArray;
    products.removeAt(index);
  }

  saveInvoice() {
    if (this.invoiceForm.invalid) {
      this.toastr.error('Please fill all the required fields');
      return;
    }
  }




}
