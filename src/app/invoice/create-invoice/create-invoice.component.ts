import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../invoice.service';

const countries = require('src/assets/countries.json');

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  countries: Array<any> = countries;
  states: Array<string> = [];

  submitted: boolean = false;
  name: string = '';
  totalInventory: Array<any> = [];
  filteredInventory: Array<any> = [];

  constructor(private invoiceService: InvoiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTotalInventory();
    this.getStates();
    this.addProduct(); // Add one product row by default
  }

  invoiceForm: FormGroup = new FormGroup({
    customerName: new FormControl('', Validators.required),
    customerEmail: new FormControl('', [Validators.required, Validators.email]),
    customerAddress: new FormControl('', Validators.required),
    customerCountry: new FormControl('India', Validators.required),
    customerState: new FormControl('', Validators.required),
    customerPhone: new FormControl('', Validators.required),
    invoiceNumber: new FormControl('', Validators.required),
    invoiceDate: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
    dueDate: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.required),
    netTotal: new FormControl(0, Validators.required),
    products: new FormArray([])
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
      itemDetails: new FormControl({}),
      name: new FormControl('', Validators.required),
      quantity: new FormControl(1, Validators.required),
      description: new FormControl(''),
      rate: new FormControl(0, Validators.required),
      netAmount: new FormControl(0.00, Validators.required),
    }));
  }

  removeProduct(index: number) {
    const products = this.invoiceForm.get('products') as FormArray;
    products.removeAt(index);
    this.calculateNetTotal();
  }

  calculateItemAmount(index: number) {
    let amt = this.invoiceForm.value.products[index].quantity * this.invoiceForm.value.products[index].rate;
    console.log(this.invoiceForm.value.products[index].quantity * this.invoiceForm.value.products[index].rate);
    this.products.at(index).patchValue({ netAmount: amt });
    this.calculateNetTotal();
  }


  calculateNetTotal() {
    let netTotal = 0;
    this.invoiceForm.value.products.forEach((product: any) => {
      netTotal += product.netAmount;
    });
    this.invoiceForm.patchValue({ netTotal: netTotal });
  }


  saveInvoice() {
    console.log(this.invoiceForm.value);
    if (this.invoiceForm.invalid) {
      this.toastr.error('Please fill all the required fields');
      return;
    }
  }


  getTotalInventory() {
    this.invoiceService.getInventory().subscribe((res: any) => {
      this.totalInventory = res.data;
      console.log(res);
    });
  }

  filterInventory(event: any) {
    this.filteredInventory = [];

    this.totalInventory.forEach((element: any) => {

      if (element.item.toLowerCase().includes(event.query.toLowerCase())) {
        console.log(element.item);
        this.filteredInventory.push(element);
      }
    });

  }

  onSelectInventory(event: any, index: number) {
    console.log(event);
    this.products.at(index).patchValue({ name: event.item, rate: event.rate, description: event.item_desc });
    this.calculateItemAmount(index);
  }

}
