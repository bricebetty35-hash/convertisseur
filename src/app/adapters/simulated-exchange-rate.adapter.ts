import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, interval, Subscription } from 'rxjs';
import { CurrencyCode } from '../domain/models/currency';
import { ExchangeRate } from '../domain/models/exchange-rate';
import { ExchangeRatePort } from '../domain/ports/exchange-rate.port';

@Injectable({ providedIn: 'root' })
export class SimulatedExchangeRateAdapter implements ExchangeRatePort, OnDestroy {

    private rates = new Map<string, BehaviorSubject<ExchangeRate>>();
    private subscriptions: Subscription[] = [];

    constructor() {
        this.initPair('EUR', 'USD', 1.1);
        // On pourra initialiser d'autres paires ici
    }

    private initPair(base: CurrencyCode, quote: CurrencyCode, initial: number) {
        const key = this.key(base, quote);
        const subject = new BehaviorSubject<ExchangeRate>({ base, quote, rate: initial });
        this.rates.set(key, subject);

        const subscription = interval(3000).subscribe(() => {
            const current = subject.value;
            const variation = (Math.random() * 0.1) - 0.05;
            const updated = +(current.rate + variation).toFixed(4);
            subject.next({ ...current, rate: updated });
        });
        this.subscriptions.push(subscription);
    }

    private key(base: CurrencyCode, quote: CurrencyCode) {
        return `${base}_${quote}`;
    }

    getRealRate$(base: CurrencyCode, quote: CurrencyCode): Observable<ExchangeRate> {
        const key = this.key(base, quote);

        if (!this.rates.has(key)) {
            this.initPair(base, quote, 1.0);
        }
        return this.rates.get(key)!.asObservable();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.subscriptions = [];
        this.rates.forEach(subject => subject.complete());
        this.rates.clear();
    }
}
