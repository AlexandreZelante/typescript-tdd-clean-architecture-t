import { SavePurchases } from "@/domain/usecases/save-purchases";
import { CacheStore } from "@/data/protocols/cache/cache-store";

// Mock like -> Instead of doing what CacheStore delete does, it uses some variables to check if everything is working as expected
export class CacheStoreSpy implements CacheStore {
  actions: Array<CacheStoreSpy.Action> = []
  deleteKey: string;
  insertKey: string;
  insertValues: Array<SavePurchases.Params> = [];

  delete(key: string): void {
    this.deleteKey = key;
    this.actions.push(CacheStoreSpy.Action.delete);
  }

  insert(key: string, value: any): void {
    this.insertKey = key;
    this.insertValues = value;
    this.actions.push(CacheStoreSpy.Action.insert);
  }

  replace(key: string, value: any): void {
    this.delete(key);
    this.insert(key, value);
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.delete);
      throw new Error()
    });
  }

  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.insert);
      throw new Error
    });
  }
}

export namespace CacheStoreSpy {
  export enum Action {
    delete,
    insert
  }
}