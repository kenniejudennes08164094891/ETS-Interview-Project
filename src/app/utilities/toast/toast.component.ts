import { Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  template: `
    <div
      class="snack-content font-euclid w-full"
      [ngClass]="{ 
        error: isErrorMessage, 
        success: isSuccessMessage , 
        warn: isWarningMessage
        }"
    >
      <div class="flex items-center ">
        <span class="info-icon"><mat-icon>info</mat-icon></span>
        <span class="text-base -mt-2">{{ data.message }}</span>
      </div>
      <span class="cancel-snack">
        <mat-icon (click)="snackBarRef.dismiss()">close</mat-icon>
      </span>
    </div>
  `,
  styles: [
    `
    @import url('https://fonts.cdnfonts.com/css/euclid-circular-a');
div{
    font-family: 'Euclid Circular A';
    color: white;
}
      .snack-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        padding: 0.5rem;
      }

      .info-icon {
        margin-right: 1rem;
      }

      .cancel-snack {
        cursor: pointer;
      }

      .error {
        background-color: #b42318;
        color: white;
      }

      .success {
        background-color: #044c21;
        color: white;
      }

      .warn {
        background-color: #eb470c;//rgb(241, 158, 4);
        color: white;
      }
    `,
  ],
})
export class ToastComponent {

  isErrorMessage: boolean;
  isWarningMessage: boolean | any;
  isSuccessMessage: boolean | any;

  constructor(
    public snackBarRef: MatSnackBarRef<ToastComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
  ) {
    this.isSuccessMessage = data.panelClass.includes('success');
    this.isErrorMessage = data.panelClass.includes('error');
    this.isWarningMessage = data.panelClass.includes('warn');
  }
}
