import {Aggregator} from "./aggregator";
import {Account} from "./account";

export interface Wholesaler {
    codeWholesaler: string
    aggregator: Aggregator
    account: Account
    aggregatorWholesalerAccount: Account
    description: string
    createdAt: Date
}
