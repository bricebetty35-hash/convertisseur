import { ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { fr_FR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { ExchangeRatePort } from './domain/ports/exchange-rate.port';
import { ConversionHistoryPort } from './domain/ports/conversion-history.port';
import { SimulatedExchangeRateAdapter } from './adapters/simulated-exchange-rate.adapter';
import { InMemoryHistoryAdapter } from './adapters/in-memory-history.adapter';

registerLocaleData(fr);

export const EXCHANGE_RATE_PORT = new InjectionToken<ExchangeRatePort>('ExchangeRatePort');
export const CONVERSION_HISTORY_PORT = new InjectionToken<ConversionHistoryPort>('ConversionHistoryPort');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideNzI18n(fr_FR),
    { provide: EXCHANGE_RATE_PORT, useClass: SimulatedExchangeRateAdapter },
    { provide: CONVERSION_HISTORY_PORT, useClass: InMemoryHistoryAdapter }
  ]
};
