import type { ICategory } from "../entities/Category.js";
import type { Service } from "../utils/types/Service.js";

export interface CategoryService extends Service<ICategory> {
      findByName: (name: string) => Promise<ICategory[]>;
}
