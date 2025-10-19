import {Loan} from "../Loan.js"
import {faker} from "@faker-js/faker"

export function LoanMok (opts?: Partial<Loan>):Loan {
  return {
    id : crypto.randomUUID(),
    userId : crypto.randomUUID(),
    bookId : crypto.randomUUID(),
    loanDate : faker.date.past(),
    returnDate : new Date(),
    createdAt : new Date(),
    updatedAt : new Date(),
    ...opts
  }
}
console.log(LoanMok()
)