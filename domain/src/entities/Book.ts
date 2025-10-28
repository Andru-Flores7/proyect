import { Entity } from "../utils/types/entity.js";

export interface Book extends Entity {
  title: string;
  author: string;
  categoryId: string ;
  available: boolean;
}





