import { Injectable } from '@angular/core';
import { ConversionResult } from '../domain/models/conversion';
import { ConversionHistoryPort } from '../domain/ports/conversion-history.port';

@Injectable({ providedIn: 'root' })
export class InMemoryHistoryAdapter implements ConversionHistoryPort {

    private history: ConversionResult[] = [];

    save(entry: ConversionResult): void {
        this.history.unshift(entry);
    }

    getLast(limit: number): ConversionResult[] {
        return this.history.slice(0, limit);
    }
}
