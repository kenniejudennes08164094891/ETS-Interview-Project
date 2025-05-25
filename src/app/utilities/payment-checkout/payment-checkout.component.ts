import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialogRef: MatDialogRef<PaymentCheckoutComponent>,
    private toast: ToastService,
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
      cardNumber: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]),
      expiryDate: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])$')]),
      month: new FormControl('', [Validators.required,Validators.pattern('^\\d{2}$')]),
      cvv: new FormControl('', [Validators.required]),
      cardHolderName: new FormControl('', [Validators.required]),
    })
  }

  downloadPaymentInvoice() {
    console.log("item>>", this.transfersForm.value);
  }


}
