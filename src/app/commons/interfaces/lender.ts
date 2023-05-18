import {Account} from "./account";

export interface Lender {
    codeLender: string
    description: string
    account: Account
    createdAt: Date
}
