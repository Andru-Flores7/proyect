import { Category } from "../Category"
import {faker} from "@faker-js/faker"
export function CategoryMok (opts?: Partial<Category>):Category {
  return {
    id : crypto.randomUUID(),
    name : faker.lorem.words({min:1, max:3}),
    description : faker.lorem.sentence(),
    createdAt : new Date(),
    updatedAt : new Date(),
    ...opts
  }
}
console.log(CategoryMok())