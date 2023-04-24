import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class AgentService extends BaseAPIService {

    getAll() {
        return this.httpGetCall('/agent')
    }

    create(codeAgent: string,
           codeWholesaler: string,
           description: string,
           overdraftMaxDailyCount: string,
           overdraftPenaltyAmount: number,
           overdraftLimitAmount: number,
           overdraftDeadlinesInDays: number) {
        return this.httpPostCall('/agent/store', {
            codeAgent : codeAgent,
            codeWholesaler : codeWholesaler,
            description : description,
            overdraftMaxDailyCount: overdraftMaxDailyCount,
            overdraftPenaltyAmount: overdraftPenaltyAmount,
            overdraftLimitAmount: overdraftLimitAmount,
            overdraftDeadlinesInDays: overdraftDeadlinesInDays
        })
    }

    update(code: string, description: string) {
        return this.httpPutCall('/agent/update/' + code, {
            description : description
        })
    }

    show(code: string) {
        return this.httpGetCall('/agent/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/agent/delete/' + code)
    }
}
