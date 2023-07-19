import {SimpleLender} from "./simple-lender";
import {Media} from "./media";

export interface ProvisionRequest{
    token: string
    amount: number
    fees: number
    status: string
    lender: SimpleLender
    medias: Media[]
    createdAt: Date
}
