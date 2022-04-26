import { SavePurchases } from "@/domain/usecases/save-purchases";
import { CacheStore } from "@/data/protocols/cache/cache-store";

// Mock like -> Instead of doing what CacheStore delete does, it uses some variables to check if everything is working as expected
export class CacheStoreSpy implements CacheStore {
  messages: Array<CacheStoreSpy.Message> = []
  deleteKey: string;
  insertKey: string;
  insertValues: Array<SavePurchases.Params> = [];

  delete(key: string): void {
    this.deleteKey = key;
    this.messages.push(CacheStoreSpy.Message.delete);
  }

  insert(key: string, value: any): void {
    this.insertKey = key;
    this.insertValues = value;
    this.messages.push(CacheStoreSpy.Message.insert);
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.Message.delete);
      throw new Error()
    });
  }

  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.Message.insert);
      throw new Error
    });
  }
}

export namespace CacheStoreSpy {
  export enum Message {
    delete,
    insert
  }
}