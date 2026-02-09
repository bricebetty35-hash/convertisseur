import { ConversionResult } from "../models/conversion";

export interface ConversionHistoryPort {
  save(entry: ConversionResult): void;
  getLast(limit: number): ConversionResult[];
}
