import {Lender} from "../interfaces/lender";

export class BaseLender implements Lender {
    codeLender: string;
    createdAt: Date;
    description: string;

    constructor(lender: Lender) {
        this.codeLender = lender.codeLender
        this.description = lender.description
        this.createdAt = new Date(lender.createdAt)
    }
}
