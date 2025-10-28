import {UserRole  ,type User } from "../User.js"
import {faker} from "@faker-js/faker"

export function UserMok (opts?: Partial<User>):User {
  return {
    id : crypto.randomUUID(),
    name : faker.person.fullName(),
    email : faker.internet.email(),
    password : faker.internet.password(),
    role : UserRole.USER,
    createdAt : new Date(),
    updatedAt : new Date(),
    ...opts
  }
}
console.log(UserMok())
