import {Account} from "../interfaces/account";

export class BaseAccount implements Account {
    balance: number;
    codeAccount: string;

    constructor(account: Account) {
        this.codeAccount = account.codeAccount
        this.balance = account.balance
    }
}
