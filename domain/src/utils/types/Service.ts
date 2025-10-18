import type { Entity } from "./entity";

export interface Service<T extends Entity> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: Omit<T, keyof Entity>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  save(item: T): Promise<void>;
  delete(id: string): Promise<void>;
}
