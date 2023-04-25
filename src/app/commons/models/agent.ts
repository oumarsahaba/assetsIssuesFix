import {Agent} from "../interfaces/agent";
import {BaseAccount} from "./account";
import {Account} from "../interfaces/account";
import {BaseSimpleWholesaler} from "./simple-wholesaler";
import {SimpleWholesaler} from "../interfaces/simple-wholesaler";

export class BaseAgent implements Agent {
    account: Account;
    codeAgent: string;
    createdAt: Date;
    description: string;
    overdraftDeadlinesInDays: number;
    overdraftLimitAmount: number;
    overdraftMaxDailyCount: number;
    overdraftPenaltyAmount: number;
    wholesaler: SimpleWholesaler;

    constructor(agent: Agent) {
        this.codeAgent = agent.codeAgent
        this.wholesaler = new BaseSimpleWholesaler(agent.wholesaler)
        this.account  = new BaseAccount(agent.account)
        this.overdraftDeadlinesInDays = agent.overdraftDeadlinesInDays
        this.overdraftLimitAmount = agent.overdraftLimitAmount
        this.overdraftMaxDailyCount = agent.overdraftMaxDailyCount
        this.overdraftPenaltyAmount = agent.overdraftPenaltyAmount
        this.description = agent.description
        this.createdAt = new Date(agent.createdAt)
    }
}
