
import type { Loan } from "../../entities/Loan.js";
import type { LoanService } from "../LoanService.js";
import { MokBookService } from "./MokBookService.js"; 





export class MokLoanService implements LoanService {
  private loans: Loan[] = [];

  constructor(initialCount = 5) {
    // Generar préstamos de prueba
    for (let i = 0; i < initialCount; i++) {
      const daysAgo = Math.floor(Math.random() * 20); // entre 0 y 20 días atrás
      this.loans.push({
        id: crypto.randomUUID(),
        userId: `user${i + 1}`,
        bookId: `book${i + 1}`,
        loanDate: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
        returnDate: null,
      
      });
    }

  }
  

  
  async createLoan(userId: string, bookId: string, loanPeriodDays = 7): Promise<Loan> {
    const loan: Loan = {
      id: crypto.randomUUID(),
      userId,
      bookId,
      loanDate: new Date(),
      returnDate: null,
   
    };
    this.loans.push(loan);
    return loan;
  }

  async markReturned(id: string, returnDate: Date = new Date()): Promise<Loan> {
    const loan = this.loans.find((l) => l.id === id);
    if (!loan) throw new Error("Préstamo no encontrado");
    loan.returnDate = returnDate;
    return loan;
  }

  async findById(id: string): Promise<Loan> {
    const loan = this.loans.find((l) => l.id === id);
    if (!loan) throw new Error("Préstamo no encontrado");
    return loan;
  }

  async findByUserId(userId: string): Promise<Loan[]> {
    return this.loans.filter((l) => l.userId === userId);
  }

  async findByBookId(bookId: string): Promise<Loan[]> {
    return this.loans.filter((l) => l.bookId === bookId);

  }

  async findAll(): Promise<Loan[]> {
    return this.loans;
  }

  async save(data: Loan): Promise<void> {
    const existingIndex = this.loans.findIndex((l) => l.id === data.id);
    if (existingIndex !== -1) {
      this.loans[existingIndex] = data; // Update if exists
    } else {
      this.loans.push(data); // Add if new
    }
  }

  async editOne(data: Loan): Promise<Loan> {
    const loanIndex = this.loans.findIndex((l) => l.id === data.id);
    if (loanIndex === -1) {
      throw new Error("Préstamo no encontrado para editar");
    }
    const updatedLoan = { ...this.loans[loanIndex], ...data };
    this.loans[loanIndex] = updatedLoan;
    return updatedLoan;
  }

  async updateMany(data: Loan[]): Promise<Loan[] | undefined> {
    const updatedLoans: Loan[] = [];
    data.forEach(loanToUpdate => {
      const loanIndex = this.loans.findIndex(l => l.id === loanToUpdate.id);
      if (loanIndex !== -1) {
        this.loans[loanIndex] = { ...this.loans[loanIndex], ...loanToUpdate };
        updatedLoans.push(this.loans[loanIndex]);
      }
    });
    return updatedLoans;
  }

  async delete(id: string): Promise<void> {
    this.loans = this.loans.filter((l) => l.id !== id);
  }
  
}