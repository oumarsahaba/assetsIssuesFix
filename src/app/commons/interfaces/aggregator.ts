import {Account} from "./account";

export interface Aggregator {
    codeAggregator: string
    description: string
    webhook: string
    account: Account
    createdAt: Date
}
