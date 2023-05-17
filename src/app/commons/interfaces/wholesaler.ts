import {Lender} from "./lender";
import {Aggregator} from "./aggregator";
import {Account} from "./account";

export interface Wholesaler {
    codeWholesaler: string
    codeLender: string
    aggregator: Aggregator
    account: Account
    description: string
    createdAt: Date
}
