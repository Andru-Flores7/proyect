import type { Entity } from "../utils/types/entity.js";

export interface Loan extends Entity {
    id: string;
    userId: string;
    bookId: string;
    loanDate: Date;
    returnDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

  
//     private validate(): void  {
//         if (!this.id?.trim())
//             throw new Error ("El préstamo debe tener un id")
//         if (!this.userId?.trim()) throw new Error("El préstamo debe tener un userid");
//         if (!this.bookId?.trim()) throw new Error("El préstamo debe tener un bookid");
//     }

//     markReturned(returnDate: Date = new Date()) :void {
//         if (this.returnDate) throw new Error("Préstamo ya devuelto");


//             if (returnDate < this.loanDate) {
//             throw new Error("La fecha de devolución no puede ser anterior a la fecha del préstamo.");
//         }
//         this.returnDate = returnDate;
//         this.updatedAt = new Date();
//     }
// }