import {OverviewAgent} from "./overview-agent";

export interface OverviewCreditRequest {
    token: string
    amount: number
    fees: number
    outstandingBalance: number
    recoveredAmount: number
    status: string
    type: string
    agent: OverviewAgent
    createdAt: Date
}
