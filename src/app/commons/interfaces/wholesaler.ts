import {Aggregator} from "./aggregator";
import {Account} from "./account";

export interface Wholesaler {
    codeWholesaler: string
    aggregator: Aggregator
    creditAccount: Account;
    commissionAccount: Account;
    aggregatorWholesalerAccount: Account
    description: string
    active: boolean
    createdAt: Date
}
