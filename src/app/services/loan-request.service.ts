import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class LoanRequestService extends BaseAPIService {
    getAll(codeWholesaler: string) {
        return this.httpGetCall('/loan/request/'+codeWholesaler)
    }

    create(codeWholesaler: string, codeLender: string, amount: number, recoveryPeriodInDays: number, recoveryAmountByPeriod: number, description: string) {
        return this.httpPostCall('/loan/request/store', {
            codeWholesaler : codeWholesaler,
            codeLender : codeLender,
            amount: amount,
            recoveryPeriodInDays : recoveryPeriodInDays,
            recoveryAmountByPeriod: recoveryAmountByPeriod,
            description : description
        })
    }

    validate(token: string, status: string) {
        return this.httpPostCall('/loan/request/validate', {
            token: token,
            status: status
        })
    }
}
