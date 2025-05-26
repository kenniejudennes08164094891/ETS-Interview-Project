import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmmittersService {

  checkoutItems$: ReplaySubject<any> = new ReplaySubject<any>();
  constructor() { }

  setCheckout(items:any){
    this.checkoutItems$.next(items);
  }

  getCheckoutItems(){
    return this.checkoutItems$.asObservable();
  }
}
