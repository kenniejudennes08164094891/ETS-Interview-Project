import { Component, Inject, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmmittersService } from 'src/app/services/emmitters.service';
import { Router } from '@angular/router';
// import * as html2pdf from 'html2pdf.js';
import html2pdf from 'html2pdf.js';



@Component({
  selector: 'app-payment-checkout',
  templateUrl: './payment-checkout.component.html',
  styleUrls: ['./payment-checkout.component.scss']
})
export class PaymentCheckoutComponent implements OnInit, OnDestroy {

  transfersForm!: FormGroup;
  cardPaymentForm!: FormGroup;
  paymentPlatform: any;
  showPaymentMethod: boolean = false;
  timeLeft: string = '01:00:00';
  private intervalId: any;
  private totalSeconds = 3600;
  downloadText: string = "Process Payment";
  invoiceParams: any = {};
  showReceipt: boolean = false;
  downloadReceipt: string = "⇩ Download Receipt";

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialogRef: MatDialogRef<PaymentCheckoutComponent>,
    private toast: ToastService,
    private emmitterService: EmmittersService,
    private router: Router
  ) {
    console.log("dialogData>>", dialogData);
  }

  ngOnInit(): void {
    this.checkoutFormData();
    this.startCountdown(this.totalSeconds);
  }

  selectPaymentPlatform(event: any) {
    if (event) {
      this.paymentPlatform = event;
      this.showPaymentMethod = true;
    }
  }

  pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  startCountdown(duration: number) {
    let remainingTime = duration;

    this.intervalId = setInterval(() => {
      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = remainingTime % 60;

      this.timeLeft = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;

      remainingTime--;

      if (remainingTime < 0) {
        clearInterval(this.intervalId);
        this.timeLeft = '00:00:00';
        this.dialogRef.close();
        console.log("Countdown finished.");
      }
    }, 1000);
  }


  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  checkoutFormData() {
    this.transfersForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      amount: new FormControl(this.dialogData?.totals),
    })

    this.cardPaymentForm = new FormGroup({
      cardNumber: new FormControl(null, [Validators.required, Validators.maxLength(16), Validators.minLength(16)]),
      year: new FormControl(null, [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])$')]),
      month: new FormControl(null, [Validators.required, Validators.pattern('^\\d{2}$'), Validators.max(12)]),
      cvv: new FormControl(null, [Validators.required]),
      cardHolderName: new FormControl(null, [Validators.required]),
    })
  }

  hasEmptyOrNullValues(obj: any) {
    const keys = Object.keys(obj);
    for (const key of keys) {
      const value = obj[key];
      if (value === '' || value === null || typeof value === 'undefined') {
        return true;
      }
    }
    return false;
  }

  async showPaymentInvoice() {
    this.downloadText = "Processing...";
    setTimeout(() => {
      this.showReceipt = true;
      let invalidCardDetails = this.hasEmptyOrNullValues(this.cardPaymentForm.value);
      switch (this.paymentPlatform) {
        case 'transfer':
          if (this.transfersForm.valid) {
            this.emmitterService.setCheckout({
              checkedItems: this.dialogData.checkedItems,
              metaDeta: {
                amount: this.dialogData.totals,
                paymentType: this.paymentPlatform,
                ...this.transfersForm.value
              }
            });
            // await this.router.navigateByUrl('/receipt');
          } else {
            this.toast.openSnackBar("Some fields are required!", "error");
          }

          break;
        case 'card':
          if (invalidCardDetails === false) {
            this.emmitterService.setCheckout({
              checkedItems: this.dialogData.checkedItems,
              metaDeta: {
                amount: this.dialogData.totals,
                paymentType: this.paymentPlatform,
                cardNumber: this.cardPaymentForm.get('cardNumber')?.value,
                expiryDate: this.cardPaymentForm.get('month')?.value + "/" + this.cardPaymentForm.get('year')?.value,
                cardHolderName: this.cardPaymentForm.get('cardHolderName')?.value,
              }
            });
            // await this.router.navigateByUrl('/receipt');
          } else {
            this.toast.openSnackBar("Some fields are required!", "error");
          }
          break;
        case 'cash':
          this.emmitterService.setCheckout({
            checkedItems: this.dialogData.checkedItems,
            paymentType: this.paymentPlatform,
            metaDeta: {
              amount: this.dialogData.totals,
              paymentType: this.paymentPlatform,
              venue: "Payment via GoFinance Payment Agent, Lekki Admiralty way."
            }
          });
          //await this.router.navigateByUrl('/receipt');
          break;
        default:
          this.toast.openSnackBar("Payment must be type Transfer, Cash or Card", "error");
          this.downloadText = "Process Payment";
          break;
      }
    }, 2000)

  }

  downloadPDF() {
    this.downloadReceipt = "Processing...";
    setTimeout(() => {
      const options = {
        margin: 0.5,
        filename: `${this.paymentPlatform}-invoice.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      const content: HTMLElement = this.pdfContent.nativeElement;

      html2pdf().from(content).set(options).save();
      this.downloadReceipt = "⇩ Download Receipt";
    }, 1000);
  }

}
