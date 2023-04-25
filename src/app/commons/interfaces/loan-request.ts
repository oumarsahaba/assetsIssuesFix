import {SimpleWholesaler} from "./simple-wholesaler";

export interface LoanRequest {
    token: string
    amount: number
    status: string
    wholesaler: SimpleWholesaler
}
