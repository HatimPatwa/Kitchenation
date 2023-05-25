import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

interface Item {
  id?: number,
  item?: string,
  item_desc: string,
  rate?: number,
  // quantity: number;
  hsn?: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ConfirmationService]
})
export class DashboardComponent implements OnInit {

  allInventory: Array<any> = [];
  itemDialog: boolean = false;

  ItemForm: Item = {
    item_desc: '',
  };

  submitted: boolean = false;

  constructor(private inventoryService: InventoryService,
    private dialog: ConfirmationService,
    private toastr: ToastrService) { }

  @ViewChild('inventoryTable') table: any;

  ngOnInit(): void {
    this.getAllInventory(); // get all inventory data
  }

  hideDialog() {
    this.itemDialog = false;
  }

  openNew() {
    this.ItemForm = {
      item_desc: '',
    };
    this.submitted = false;
    this.itemDialog = true;
  }



  getAllInventory() {
    this.inventoryService.getInventory().subscribe((res: any) => {
      this.allInventory = res.data;
    });
  }

  editItem(item: any) {

    this.ItemForm = { ...item };
    this.itemDialog = true;
  }


  deleteItem(id: any) {

    this.dialog.confirm({
      message: 'Are you sure that you want to delete this item?',
      acceptButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Delete',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.inventoryService.deleteInventory(id).subscribe((res: any) => {
          if (res && res.code === 200) {
            this.toastr.success('Item deleted successfully');
            this.getAllInventory();

          }
        });
      },

    })


  }

  saveItem() {

    this.submitted = true;
    if (this.ItemForm.item && this.ItemForm.rate && this.ItemForm.hsn) {
      if (this.ItemForm.id) {
        this.inventoryService.updateInventory(this.ItemForm).subscribe((res: any) => {
          if (res && res.code === 200) {
            console.log('res', res);
            this.itemDialog = false;
            this.getAllInventory();
            this.toastr.success('Item updated successfully', 'Success');
          } else {
            this.toastr.error('Something went wrong');
          }
        });
      } else {
        this.inventoryService.addInventory(this.ItemForm).subscribe((res: any) => {
          if (res && res.code === 200) {
            this.toastr.success('Item added successfully');
            this.getAllInventory();
            this.itemDialog = false;
          }
        });
      }
    } else {
      this.toastr.error('Please fill all required fields');
    }

  }

  search(event: any) {
    this.table.filterGlobal(event.target.value, 'contains');
  }


}
