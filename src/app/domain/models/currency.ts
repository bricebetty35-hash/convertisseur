export type CurrencyCode = 'EUR' | 'USD' | 'GBP' | 'JPY';

export interface Currency {
  code: CurrencyCode;
  label: string;
}
