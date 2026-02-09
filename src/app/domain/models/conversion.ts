import { CurrencyCode } from "./currency";

export interface ConversionRequest {
  from: CurrencyCode;
  to: CurrencyCode;
  amount: number;
  usedRate: number;
  realRate: number;
  forcedRate?: number | null;
}

export interface ConversionResult {
  from: CurrencyCode;
  to: CurrencyCode;
  inputAmount: number;
  outputAmount: number;
  usedRate: number;
  realRate: number;
  forcedRate?: number | null;
  timestamp: Date;
}
