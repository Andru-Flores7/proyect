


export interface Loan {
    id : string;
    userId : string;
    bookId : string;
    loanDate : Date;
    returnDate : Date | null;
}