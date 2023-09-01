import {Account} from "./account";
import {SimpleWholesaler} from "./simple-wholesaler";
import {OverviewWholesaler} from "./overview-wholesaler";

export interface OverviewAgent {
    codeAgent: string
    description: string
    wholesaler: OverviewWholesaler
}
