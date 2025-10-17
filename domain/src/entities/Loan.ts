import type { Entity } from "../utils/types/entity.js";

export interface ILoan extends Entity {
    userId: string;
    bookId: string;
    loanDate: Date;
    returnDate: Date | null;
}

export class Loan implements ILoan {
    id: string;
    userId: string;
    bookId: string;
    loanDate: Date;
    returnDate: Date | null;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, userId: string, bookId: string, loanDate: Date = new Date()) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.loanDate = loanDate;
        this.returnDate = null;
        this.createdAt = new Date();
        this.updatedAt = new Date();

        this.validate();
    }

    private validate(): void  {
        if (!this.id?.trim())
            throw new Error ("El préstamo debe tener un id")
        if (!this.userId?.trim()) throw new Error("El préstamo debe tener un userid");
        if (!this.bookId?.trim()) throw new Error("El préstamo debe tener un bookid");
    }

    markReturned(returnDate: Date = new Date()) :void {
        if (this.returnDate) throw new Error("Préstamo ya devuelto");


            if (returnDate < this.loanDate) {
            throw new Error("La fecha de devolución no puede ser anterior a la fecha del préstamo.");
        }
        this.returnDate = returnDate;
        this.updatedAt = new Date();
    }
}