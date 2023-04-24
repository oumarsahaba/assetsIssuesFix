import {SimpleWholesaler} from "../interfaces/simple-wholesaler";

export class BaseSimpleWholesaler implements SimpleWholesaler {
    codeWholesaler: string;
    description: string;

    constructor(wholesaler: SimpleWholesaler) {
        this.codeWholesaler = wholesaler.codeWholesaler
        this.description = wholesaler.description
    }
}
