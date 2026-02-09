import { Injectable } from '@angular/core';
import { ConversionRequest, ConversionResult } from '../models/conversion';

@Injectable({ providedIn: 'root' })
export class ConversionDomainService {

  convert(request: ConversionRequest): ConversionResult {
    const { from, to, amount, usedRate, realRate, forcedRate } = request;

    const outputAmount =
      from === to ? amount : (from === 'EUR' ? amount * usedRate : amount / usedRate);

      // De la devise de base vers la devise cible -> EUR -> USD : amount * rate
      // De la devise cible vers la devise de base -> USD -> EUR : amount / rate

    return {
      from,
      to,
      inputAmount: amount,
      outputAmount: +outputAmount.toFixed(4),
      usedRate,
      realRate,
      forcedRate,
      timestamp: new Date()
    };
  }

  shouldDisableForcedRate(realRate: number, forcedRate: number | null, threshold = 0.02): boolean {
    if (forcedRate == null) return false;

    const diff = Math.abs((forcedRate - realRate) / realRate);
    return diff > threshold;
  }
}
