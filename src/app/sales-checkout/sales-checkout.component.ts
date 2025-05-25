import { Component } from '@angular/core';
import { imageIcons, SellableItem, sellableItems } from '../models/mocks';
import { MatDialog } from '@angular/material/dialog';
import { PaymentCheckoutComponent } from '../utilities/payment-checkout/payment-checkout.component';

@Component({
  selector: 'app-sales-checkout',
  templateUrl: './sales-checkout.component.html',
  styleUrls: ['./sales-checkout.component.scss']
})
export class SalesCheckoutComponent {

sellableItems: any[] = sellableItems;
atmCard:string = imageIcons.atmCards;
 selectedItems: SellableItem[] = [];
 totals:number = 0;
constructor(
  private dialog:MatDialog
){}

  updateSelectedItems(event: any, index: number) {
    if (event) {
      this.selectedItems.push(this.sellableItems[index]);
    } else {
      this.selectedItems = this.selectedItems.filter((item:any) => item !== this.sellableItems[index]);
    }
    const onlyPrices = this.selectedItems.map((item:any) => item.price);
    this.totals = onlyPrices.reduce((acc:any, incr:any) => acc + incr, 0);
  }


  viewSelextedItems(){
    this.dialog.open(PaymentCheckoutComponent,{
      data: {
        checkedItems: this.selectedItems,
        totals: `$${this.totals.toLocaleString('en-NG')}`
      }
    })
  }

  // /receipt
}
