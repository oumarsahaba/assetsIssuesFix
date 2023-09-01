import {Aggregator} from "./aggregator";
import {Account} from "./account";
import {AggregatorWholesaler} from "./aggregator-wholesaler";
import {OverviewAggregator} from "./overview-aggregator";

export interface OverviewWholesaler {
    codeWholesaler: string
    description: string
    aggregator: OverviewAggregator
}
