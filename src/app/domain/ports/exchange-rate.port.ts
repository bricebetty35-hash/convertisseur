import { Observable } from 'rxjs';
import { CurrencyCode } from '../models/currency';
import { ExchangeRate } from '../models/exchange-rate';

export interface ExchangeRatePort {
  getRealRate$(base: CurrencyCode, quote: CurrencyCode): Observable<ExchangeRate>;
}
