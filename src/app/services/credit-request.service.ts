import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class CreditRequestService extends BaseAPIService {

    getAll(codeAgent: string) {
        return this.httpGetCall('/credit/request/'+ codeAgent)
    }

    create(codeAgent: string, amount: number, recoveryPeriodInDays: number, recoveryAmountByPeriod: number) {
        return this.httpPostCall('/credit/request/store', {
            codeAgent : codeAgent,
            amount : amount,
            recoveryPeriodInDays: recoveryPeriodInDays,
            recoveryAmountByPeriod: recoveryAmountByPeriod
        })
    }
}
