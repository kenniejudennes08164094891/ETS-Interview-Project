import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMonth]'
})
export class MonthDirective {

   constructor(private el: ElementRef, private control: NgControl) { }

  // Ensures only numbers are input and value does not exceed 12
  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let cleaned = input.value.replace(/\D+/g, '');

    // Apply maximum value check (for MM, max is 12)
    if (cleaned.length > 0) {
      const numericValue = parseInt(cleaned, 10);
      if (numericValue > 12) {
        cleaned = '12';
      } else if (numericValue === 0) {
        cleaned = '01';
      } else if (cleaned.length === 1 && numericValue > 1) {
        // Auto-correct leading digits like 3 -> 03
        cleaned = '0' + cleaned;
      }
    }

    if (input.value !== cleaned) {
      input.value = cleaned;
      this.control.control?.setValue(cleaned); // sync model
      event.stopPropagation();
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'
    ];
    if (
      allowedKeys.includes(event.key) ||
      (event.key >= '0' && event.key <= '9')
    ) {
      return;
    } else {
      event.preventDefault();
    }
  }
}
