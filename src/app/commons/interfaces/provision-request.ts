import {SimpleLender} from "./simple-lender";

export interface ProvisionRequest{
    token: string
    amount: number
    fees: number
    status: string
    lender: SimpleLender
    createdAt: Date
}
