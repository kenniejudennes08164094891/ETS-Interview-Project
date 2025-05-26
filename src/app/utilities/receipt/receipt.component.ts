import { Component, OnInit } from '@angular/core';
import { EmmittersService } from 'src/app/services/emmitters.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  checkedItems: any[] = [];
  metaDeta: any = {};
  subItems: any[] = [];
  totals: number = 0;
  invoiceParams: any = {};
  constructor(
    private emmitterService: EmmittersService
  ) {
    this.generateInvoiceDetails();
   }

  generateInvoiceDetails() {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const invoiceDatePart = `${year}${month}${day}`;
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    const randomInvoiceNumber = `INV-${invoiceDatePart}-${randomNumber}`;

    this.invoiceParams = {
      randomInvoiceNumber: `Invoice #${randomInvoiceNumber}`,
      todaysDate: `Date: ${formattedDate}`
    };
    return {
      randomInvoiceNumber: `Invoice #${randomInvoiceNumber}`,
      todaysDate: `Date: ${formattedDate}`
    };
  }

  getReceiptData() {
    this.emmitterService.getCheckoutItems().subscribe({
      next: (data: any) => {
        console.log("receipt items>>", data);
        this.checkedItems = data?.checkedItems;
        this.metaDeta = data?.metaDeta;
        this.subItems = Object.entries(data?.metaDeta).map(([key, value]:any) => `${key}: ${value}`);
        this.totals = data?.checkedItems?.map((items: any) => items.price)?.reduce((acc: any, incr: any) => acc + incr, 0);
      }
    })
  }

  ngOnInit(): void {
    this.getReceiptData();
  }
}
