import {CreditRequest} from "./credit-request";

export interface OverviewRefundRequest {
    token: string
    amount: number
    status: string
    creditRequest: CreditRequest
    createdAt: Date
}
