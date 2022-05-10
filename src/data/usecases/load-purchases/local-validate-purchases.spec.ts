// Local refers to a local cache
import { LocalLoadPurchases } from '@/data/usecases'
import { CacheStoreSpy, mockPurchases, getCacheExpirationDate } from '@/data/tests'

type SutTypes = {
  sut: LocalLoadPurchases;
  cacheStore: CacheStoreSpy;
};

// SUT = System under test
const makeSut = (timestamp = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalLoadPurchases(cacheStore, timestamp);
  return {
    sut,
    cacheStore,
  };
};

describe("LocalLoadPurchases", () => {
  test("Should not delete or insert cache on sut.init", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.actions).toEqual([]);
  });

  // test("Should return empty list if load fails", async () => {
  //   const { cacheStore, sut } = makeSut();
  //   cacheStore.simulateFetchError()
  //   const purchases = await sut.loadAll()
  //   expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch]);
  //   expect(cacheStore.deleteKey).toBe('purchases')
  //   expect(purchases).toEqual([])
  // });

});
