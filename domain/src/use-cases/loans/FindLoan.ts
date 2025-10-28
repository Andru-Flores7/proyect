import type { Loan } from "../../entities/Loan.js";
import type { LoanService } from "../../services/LoanService.js";

interface FindLoanDeps {
  loanService: LoanService;
}

interface FindLoanPayload {
  loanId: string;
}

export async function FindLoan(
  { loanService }: FindLoanDeps,
  { loanId }: FindLoanPayload
) {
  // Buscar préstamo por ID
  const loan = await loanService.findById(loanId);

  if (!loan) return new Error("El préstamo no existe"); // devolvemos Error si no existe

  return loan; // devolvemos el préstamo encontrado
}
