import {Aggregator} from "../interfaces/aggregator";

export class BaseAggregator implements Aggregator {
    codeAggregator: string;
    createdAt: Date;
    description: string;

    constructor(aggregator: Aggregator) {
        this.codeAggregator = aggregator.codeAggregator
        this.description = aggregator.description
        this.createdAt = new Date(aggregator.createdAt)
    }
}
