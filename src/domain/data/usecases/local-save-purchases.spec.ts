// Local refering to a local cache

// Business rules
class LocalSavePurchases {
  constructor(private readonly cacheStore: CacheStore) { }

  async save(): Promise<void> {
    this.cacheStore.delete('purchases');
  }
}

// Generic cache class
class CacheStore {
  delete: (key: string) => void;
}

// Mock like -> Instead of doing what CacheStore delete does, it uses some variables to check if everything is working as expected
class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;
  key: string;

  delete(key: string): void {
    this.deleteCallsCount++;
    this.key = key;
  }
}

type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
};

// SUT = System under test
const makeSut = (): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);
  return {
    sut,
    cacheStore,
  };
};

describe("LocalSavePurchases", () => {
  test("Should not delete cache on sut.init", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  test("Should delete old cache on sut.save", async () => {
    const { cacheStore, sut } = makeSut();
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.key).toBe('purchases');
  });
});
