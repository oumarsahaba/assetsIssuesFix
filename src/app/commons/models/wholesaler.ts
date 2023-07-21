import {Wholesaler} from "../interfaces/wholesaler";
import {Aggregator} from "../interfaces/aggregator";
import {Account} from "../interfaces/account";
import {BaseAggregator} from "./aggregator";
import {BaseAccount} from "./account";

export class BaseWholesaler implements Wholesaler {
    aggregator: Aggregator;
    account: Account
    aggregatorWholesalerAccount: Account
    codeWholesaler: string;
    createdAt: Date;
    description: string;
    active: boolean;

    constructor(wholesaler: Wholesaler) {
        this.codeWholesaler = wholesaler.codeWholesaler
        this.aggregator = new BaseAggregator(wholesaler?.aggregator)
        this.account = new BaseAccount(wholesaler.account)
        this.aggregatorWholesalerAccount = new BaseAccount(wholesaler.aggregatorWholesalerAccount)
        this.description = wholesaler.description
        this.active = wholesaler.active
        this.createdAt = new Date(wholesaler.createdAt)
    }

}
