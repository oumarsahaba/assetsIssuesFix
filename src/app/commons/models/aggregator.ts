import {Aggregator} from "../interfaces/aggregator";
import {Account} from "../interfaces/account";

export class BaseAggregator implements Aggregator {
    codeAggregator: string;
    createdAt: Date;
    account: Account;
    description: string;

    constructor(aggregator: Aggregator) {
        this.codeAggregator = aggregator.codeAggregator
        this.description = aggregator.description
        this.account = aggregator.account
        this.createdAt = new Date(aggregator.createdAt)
    }
}
