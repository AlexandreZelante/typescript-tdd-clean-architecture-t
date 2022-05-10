import { CachePolicy, CacheStore } from "@/data/protocols/cache";
import { LoadPurchases, SavePurchases } from "@/domain/usecases";

export class LocalLoadPurchases implements SavePurchases, LoadPurchases {
  private readonly key = 'purchases';

  constructor(
    private readonly cacheStore: CacheStore,
    private readonly currentDate: Date,
  ) { }

  async save(purchases: Array<SavePurchases.Params>): Promise<void> {
    this.cacheStore.replace(this.key, {
      timestamp: this.currentDate,
      value: purchases
    });
  }

  /* According to CQRS (Command Query Responsibility Segregation) we should separate Query and Command functions
   * This is a Query. It returns information. So it should not hav any side effect.
   */
  async loadAll(): Promise<Array<LoadPurchases.Result>> {
    try {
      const cache = this.cacheStore.fetch(this.key);
      return CachePolicy.validate(cache.timestamp, this.currentDate) ? cache.value : [];
    } catch (error) {
      return []
    }
  }

  // Command - State mutation
  validate(): void {
    try {
      const cache = this.cacheStore.fetch(this.key)
      if (!CachePolicy.validate(cache.timestamp, this.currentDate)) {
        throw new Error()
      }
    } catch (error) {
      this.cacheStore.delete(this.key)
    }
  }
}