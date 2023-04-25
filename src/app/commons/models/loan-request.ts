import {LoanRequest} from "../interfaces/loan-request";
import {SimpleWholesaler} from "../interfaces/simple-wholesaler";
import {BaseSimpleWholesaler} from "./simple-wholesaler";

export class BaseLoanRequest implements LoanRequest {
    token: string
    amount: number
    status: string
    wholesaler: SimpleWholesaler

    constructor(loanRequest: LoanRequest) {
        this.token = loanRequest.token
        this.amount = loanRequest.amount
        this.status = loanRequest.status
        this.wholesaler = new BaseSimpleWholesaler(loanRequest.wholesaler)
    }
}
