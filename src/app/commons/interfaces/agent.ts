import {Account} from "./account";
import {SimpleWholesaler} from "./simple-wholesaler";

export interface Agent {
    codeAgent: string
    wholesaler: SimpleWholesaler
    account: Account
    overdraftLimitAmount: number
    overdraftPenaltyAmount: number
    overdraftMaxDailyCount: number
    overdraftDeadlinesInDays: number
    description: string
    createdAt: Date
}
