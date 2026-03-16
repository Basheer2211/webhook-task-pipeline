
export interface mainRepositoryInterface<T> {
  create(order: T): Promise<T>;
  update(order:T):Promise<T>;
  getById(id:number):Promise<T | null>;
  delete(id:number):Promise<T>;
  getAll():Promise<T[]>;
}