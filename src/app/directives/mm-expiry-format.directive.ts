import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMmExpiryFormat]'
})
export class MmExpiryFormatDirective {

  
  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let cleaned = input.value.replace(/\D+/g, '');
    const currentYear = new Date().getFullYear();
    const minYear = currentYear % 100;
    if (cleaned.length >= 6) {
      const yy = cleaned.slice(4, 6);
      const yyNumber = parseInt(yy, 10);

      if (yyNumber < minYear) {
        cleaned = cleaned.slice(0, 4) + minYear.toString().padStart(2, '0');
      }
    }

    if (cleaned.length > 6) {
      cleaned = cleaned.slice(0, 6);
    }

    if (input.value !== cleaned) {
      input.value = cleaned;
      this.control.control?.setValue(cleaned);
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
