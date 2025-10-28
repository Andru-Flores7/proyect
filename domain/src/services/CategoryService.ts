import type { Category } from "../entities/Category.js";
import type { Service } from "../utils/types/Service.js";

export interface CategoryService extends Service<Category> {
      findByName: (name: string) => Promise<Category[]>;
}
