import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class CreditRequestService extends BaseAPIService {

    getAll(codeAgent: string, page: number = 0, size: number = 5) {
        return this.httpGetCall(`/credit/request/${codeAgent}?page=${page}&size=${size}`)
    }

    create(codeAgent: string, amount: number, recoveryPeriodInDays: number, recoveryAmountByPeriod: number) {
        return this.httpPostCall('/credit/request/store', {
            codeAgent : codeAgent,
            amount : amount,
            recoveryPeriodInDays: recoveryPeriodInDays,
            recoveryAmountByPeriod: recoveryAmountByPeriod
        })
    }

    validate(token: string, status: string) {
        return this.httpPostCall('/credit/request/validate', {
            token: token,
            status: status
        })
    }
}
