// src/domain/services/LoanService.ts
import type { ILoan } from "../entities/Loan.js";
import type { Service } from "../utils/types/Service.js";

export interface LoanService extends Service<ILoan> {
  findActiveByUserId: (userId: string) => Promise<ILoan[]>;
  findActiveByBookId: (bookId: string) => Promise<ILoan | null>;
  markReturned: (id: string, returnDate?: Date) => Promise<ILoan>;
}