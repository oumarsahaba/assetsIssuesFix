import {SimpleWholesaler} from "./simple-wholesaler";
import {Lender} from "./lender";
import {SimpleLender} from "./simple-lender";

export interface LoanRequest {
    token: string
    amount: number
    outstandingBalance: number
    recoveredAmount: number
    status: string
    lender: SimpleLender
    wholesaler: SimpleWholesaler
    createdAt: Date
}
