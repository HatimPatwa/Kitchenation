import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './invoice/create-invoice/create-invoice.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/invoice',
    pathMatch: 'full'
  },
  {
    path: 'invoice',
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule),
  },
  {
    path: '**',
    redirectTo: 'invoice'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
