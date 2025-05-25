import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SalesCheckoutComponent } from './sales-checkout/sales-checkout.component';
import { ReceiptComponent } from './utilities/receipt/receipt.component';

const routes: Routes = [
 {path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: 'login', component: LoginComponent},
   {path: 'checkout', component: SalesCheckoutComponent},
   {path: 'receipt', component: ReceiptComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }