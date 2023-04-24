import {Wholesaler} from "../interfaces/wholesaler";
import {Aggregator} from "../interfaces/aggregator";
import {Lender} from "../interfaces/lender";
import {Account} from "../interfaces/account";
import {BaseLender} from "./lender";
import {BaseAggregator} from "./aggregator";
import {BaseAccount} from "./account";

export class BaseWholesaler implements Wholesaler {
    aggregator: Aggregator;
    lender: Lender;
    account: Account
    codeWholesaler: string;
    createdAt: Date;
    description: string;

    constructor(wholesaler: Wholesaler) {
        this.codeWholesaler = wholesaler.codeWholesaler
        this.aggregator  = new BaseAggregator(wholesaler.aggregator)
        this.lender  = new BaseLender(wholesaler.lender)
        this.account  = new BaseAccount(wholesaler.account)
        this.description = wholesaler.description
        this.createdAt = new Date(wholesaler.createdAt)
    }

}
