import { CurrencyCode } from "./currency";

export interface ExchangeRate {
  base: CurrencyCode;
  quote: CurrencyCode;
  rate: number;
}
