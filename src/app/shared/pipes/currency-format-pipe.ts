import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, currencyCode: string = 'USD'): string {
    if (isNaN(value) || value === null) return '';

    return new Intl.NumberFormat('en-US', {style: 'currency', currency: currencyCode}).format(value);
  }
}
