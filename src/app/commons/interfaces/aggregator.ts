import {Account} from "./account";

export interface Aggregator {
    codeAggregator: string
    description: string
    account: Account
    createdAt: Date
}
