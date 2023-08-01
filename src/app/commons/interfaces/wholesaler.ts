import {Aggregator} from "./aggregator";
import {Account} from "./account";
import {AggregatorWholesaler} from "./aggregator-wholesaler";

export interface Wholesaler {
    codeWholesaler: string
    aggregator: Aggregator
    creditAccount: Account;
    commissionAccount: Account;
    aggregatorWholesaler: AggregatorWholesaler
    description: string
    active: boolean
    createdAt: Date
}
