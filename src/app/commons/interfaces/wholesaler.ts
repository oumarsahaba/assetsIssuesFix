import {Lender} from "./lender";
import {Aggregator} from "./aggregator";
import {Account} from "./account";

export interface Wholesaler {
    codeWholesaler: string
    lender: Lender
    aggregator: Aggregator
    account: Account
    description: string
    createdAt: Date
}
