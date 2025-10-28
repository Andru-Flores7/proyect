import { Book } from "../Book.js"
import {faker} from "@faker-js/faker"

export function BookMok (opts?: Partial<Book>):Book {
  return {
    id : crypto.randomUUID(),
    title : faker.lorem.words({min:2, max:5}),
    author : faker.person.fullName(),
    categoryId : crypto.randomUUID(),
    available : faker.datatype.boolean(),
    createdAt : new Date(),
    updatedAt : new Date(),
    ...opts
  }
}
console.log(BookMok())
