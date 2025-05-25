import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ToastComponent } from './utilities/toast/toast.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { SalesCheckoutComponent } from './sales-checkout/sales-checkout.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PaymentCheckoutComponent } from './utilities/payment-checkout/payment-checkout.component';
import { CardFormatPipe } from './pipes/card-format.pipe';
import { CardFormatDirective } from './directives/card-format.directive';
import { MmExpiryFormatDirective } from './directives/mm-expiry-format.directive';
import { ReceiptComponent } from './utilities/receipt/receipt.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToastComponent,
    SalesCheckoutComponent,
    PaymentCheckoutComponent,
    CardFormatPipe,
    CardFormatDirective,
    MmExpiryFormatDirective,
    ReceiptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [CardFormatDirective,MmExpiryFormatDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
