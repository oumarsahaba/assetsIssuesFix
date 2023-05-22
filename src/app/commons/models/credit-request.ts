import {CreditRequest} from "../interfaces/credit-request";
import {SimpleAgent} from "../interfaces/simple-agent";
import {BaseSimpleAgent} from "./simple-agent";

export class BaseCreditRequest implements CreditRequest {
    token: string
    amount: number
    outstandingBalance: number;
    recoveredAmount: number;
    status: string
    agent: SimpleAgent
    createdAt: Date

    constructor(creditRequest: CreditRequest) {
        this.token = creditRequest.token
        this.amount = creditRequest.amount
        this.status = creditRequest.status
        this.outstandingBalance = creditRequest.outstandingBalance;
        this.recoveredAmount = creditRequest.recoveredAmount;
        this.agent = new BaseSimpleAgent(creditRequest.agent)
        this.createdAt = creditRequest.createdAt
    }

}
