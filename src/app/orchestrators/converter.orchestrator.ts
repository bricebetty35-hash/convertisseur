import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Subscription } from 'rxjs';
import { ExchangeRatePort } from '../domain/ports/exchange-rate.port';
import { ConversionHistoryPort } from '../domain/ports/conversion-history.port';
import { ConversionDomainService } from '../domain/services/conversion-domain.service';
import { ConversionResult } from '../domain/models/conversion';
import { CurrencyCode } from '../domain/models/currency';
import { EXCHANGE_RATE_PORT, CONVERSION_HISTORY_PORT } from '../app.config';

export interface ConverterViewModel {
    base: CurrencyCode;
    quote: CurrencyCode;
    inputAmount: number;
    outputAmount: number;
    realRate: number;
    usedRate: number;
    forcedRate: number | null;
    history: ConversionResult[];
}

@Injectable({ providedIn: 'root' })
export class ConverterOrchestrator implements OnDestroy {

    private base$ = new BehaviorSubject<CurrencyCode>('EUR');
    private quote$ = new BehaviorSubject<CurrencyCode>('USD');
    private inputAmount$ = new BehaviorSubject<number>(1);
    private forcedRate$ = new BehaviorSubject<number | null>(null);
    private viewModel$ = new BehaviorSubject<ConverterViewModel | null>(null);
    private subscription?: Subscription;

    constructor(
        @Inject(EXCHANGE_RATE_PORT) private exchangeRatePort: ExchangeRatePort,
        @Inject(CONVERSION_HISTORY_PORT) private historyPort: ConversionHistoryPort,
        private readonly domain: ConversionDomainService
    ) {
        this.init();
    }

    private init() {
        const realRate$ = this.exchangeRatePort
            .getRealRate$(this.base$.value, this.quote$.value)
            .pipe(map(r => r.rate));

        this.subscription = combineLatest([
            this.base$,
            this.quote$,
            this.inputAmount$,
            realRate$,
            this.forcedRate$
        ]).subscribe(([base, quote, amount, realRate, forcedRate]) => {

            if (this.domain.shouldDisableForcedRate(realRate, forcedRate)) {
                this.forcedRate$.next(null);
                forcedRate = null;
            }

            const usedRate = forcedRate ?? realRate;

            const result = this.domain.convert({
                from: base,
                to: quote,
                amount,
                usedRate,
                realRate,
                forcedRate
            });

            const vm: ConverterViewModel = {
                base,
                quote,
                inputAmount: amount,
                outputAmount: result.outputAmount,
                realRate,
                usedRate,
                forcedRate,
                history: this.historyPort.getLast(5)
            };

            this.viewModel$.next(vm);
        });
    }

    getViewModel$() {
        return this.viewModel$.asObservable();
    }

    setInputAmount(amount: number) {
        this.inputAmount$.next(amount);
    }

    setForcedRate(rate: number | null) {
        this.forcedRate$.next(rate);
    }

    switchDirection() {
        const current = this.viewModel$.value;
        if (!current) return;

        const newBase = current.quote;
        const newQuote = current.base;
        const newInput = current.outputAmount;

        this.base$.next(newBase);
        this.quote$.next(newQuote);
        this.inputAmount$.next(newInput);
    }

    addToHistory() {
        const current = this.viewModel$.value;
        if (!current) return;

        const result: ConversionResult = {
            from: current.base,
            to: current.quote,
            inputAmount: current.inputAmount,
            outputAmount: current.outputAmount,
            usedRate: current.usedRate,
            realRate: current.realRate,
            forcedRate: current.forcedRate ?? undefined,
            timestamp: new Date()
        };

        this.historyPort.save(result);
        this.viewModel$.next({
            ...current,
            history: this.historyPort.getLast(5)
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        this.base$.complete();
        this.quote$.complete();
        this.inputAmount$.complete();
        this.forcedRate$.complete();
        this.viewModel$.complete();
    }
}
