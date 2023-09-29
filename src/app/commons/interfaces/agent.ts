import {Account} from "./account";
import {SimpleWholesaler} from "./simple-wholesaler";

export interface Agent {
    codeAgent: string
    wholesaler: SimpleWholesaler
    account: Account
    overdraftLimitAmount: number
    overdraftMaxDailyCount: number
    overdraftBillingOccurrence: number
    penaltyDelayInDays: number,
    description: string
    active: boolean
    createdAt: Date,

}
