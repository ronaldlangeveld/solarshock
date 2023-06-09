export interface IRepository<T> {
    save(item: T): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    deleteById(id: string): Promise<void>;
  }
  
export class InMemoryRepository<T> implements IRepository<T> {
    private db: Record<string, T> = {};
  
    async save(item: T & { id: string }): Promise<T> {
        this.db[item.id] = item;
        return item;
    }
  
    async findById(id: string): Promise<T | null> {
        return this.db[id] || null;
    }
  
    async findAll(): Promise<T[]> {
        return Object.values(this.db);
    }
  
    async deleteById(id: string): Promise<void> {
        delete this.db[id];
    }
}
