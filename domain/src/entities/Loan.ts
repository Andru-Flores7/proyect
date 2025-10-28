import type { Entity } from "../utils/types/entity.js";


export interface Loan extends Entity {
    userId : string;
    bookId : string;
    loanDate : Date;
    returnDate : Date | null;
}
