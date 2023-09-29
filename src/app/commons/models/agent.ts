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
    active: boolean;
    overdraftLimitAmount: number;
    overdraftMaxDailyCount: number;
    overdraftBillingOccurrence: number;
    penaltyDelayInDays: number;
    wholesaler: SimpleWholesaler;

    constructor(agent: Agent) {
        this.codeAgent = agent.codeAgent
        this.wholesaler = new BaseSimpleWholesaler(agent.wholesaler)
        this.account = new BaseAccount(agent.account)
        this.overdraftLimitAmount = agent.overdraftLimitAmount
        this.overdraftMaxDailyCount = agent.overdraftMaxDailyCount
        this.overdraftBillingOccurrence = agent.overdraftBillingOccurrence
        this.penaltyDelayInDays = agent.penaltyDelayInDays
        this.description = agent.description
        this.active = agent.active
        this.createdAt = new Date(agent.createdAt)
    }
}
