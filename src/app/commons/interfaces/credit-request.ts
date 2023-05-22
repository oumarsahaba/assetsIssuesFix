import {SimpleAgent} from "./simple-agent";

export interface CreditRequest {
    token: string
    amount: number
    outstandingBalance: number
    recoveredAmount: number
    status: string
    agent: SimpleAgent
    createdAt: Date
}
