import {Account} from "./account";
import {SimpleWholesaler} from "./simple-wholesaler";

export interface Agent {
    overdraftBillingOccurrence: number;
    codeAgent: string
    wholesaler: SimpleWholesaler
    account: Account
    overdraftLimitAmount: number
    overdraftMaxDailyCount: number
    penaltyDelayInDays: number,
    description: string
    active: boolean
    createdAt: Date,

}
