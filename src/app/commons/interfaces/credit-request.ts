import {SimpleAgent} from "./simple-agent";

export interface CreditRequest {
    token: string
    amount: number
    fees: number
    outstandingBalance: number
    recoveredAmount: number
    status: string
    agent: SimpleAgent
    type: string
    createdAt: Date
}
