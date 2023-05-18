import {Lender} from "../interfaces/lender";
import {Account} from "../interfaces/account";
import {BaseAccount} from "./account";

export class BaseLender implements Lender {
    codeLender: string;
    createdAt: Date;
    account: Account;
    description: string;

    constructor(lender: Lender) {
        this.codeLender = lender.codeLender
        this.description = lender.description
        this.account  = new BaseAccount(lender.account)
        this.createdAt = new Date(lender.createdAt)
    }
}
