// Generic cache class
export class CacheStore {
  delete: (key: string) => void;
  // value should have "any" type because is a generic component
  insert: (key: string, value: any) => void;
  replace: (key: string, value: any) => void;
}