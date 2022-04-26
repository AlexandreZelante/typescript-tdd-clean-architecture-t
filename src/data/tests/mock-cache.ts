import { SavePurchases } from "@/domain/usecases/save-purchases";
import { CacheStore } from "@/data/protocols/cache/cache-store";

// Mock like -> Instead of doing what CacheStore delete does, it uses some variables to check if everything is working as expected
export class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;
  insertCallsCount = 0;
  deleteKey: string;
  insertKey: string;
  insertValues: Array<SavePurchases.Params> = [];

  delete(key: string): void {
    this.deleteCallsCount++;
    this.deleteKey = key;
  }

  insert(key: string, value: any): void {
    this.insertCallsCount++;
    this.insertKey = key;
    this.insertValues = value;
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => { throw new Error });
  }

  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(() => { throw new Error });
  }
}