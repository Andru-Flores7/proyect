// src/domain/services/LoanService.ts
import type { Loan } from "../entities/Loan.js";
import type { Service } from "../utils/types/Service.js";

export interface LoanService extends Service<Loan> {
 findByUserId: (userId: string) => Promise<Loan[]>;
findByBookId: (bookId: string) => Promise<Loan[]>;
 findById: (id: string) => Promise<Loan>;
 markReturned: (id: string, returnDate?: Date) => Promise<Loan>;
 findAll: () => Promise<Loan[]>;
 delete: (id: string) => Promise<void>;

}