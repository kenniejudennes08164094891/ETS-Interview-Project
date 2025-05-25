import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardFormat'
})
export class CardFormatPipe implements PipeTransform {

   transform(value: string | number): string {
    if (!value) return '';
    const digitsOnly:any = value.toString().replace(/\D/g, '');
    const formatted:any = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.trim();
  }

}
