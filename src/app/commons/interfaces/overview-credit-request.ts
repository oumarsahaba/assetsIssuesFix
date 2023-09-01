import {SimpleAgent} from "./simple-agent";
import {OverviewAgent} from "./overview-agent";

export interface OverviewCreditRequest {
    token: string
    amount: number
    fees: number
    outstandingBalance: number
    recoveredAmount: number
    status: string
    agent: OverviewAgent
    createdAt: Date
}
