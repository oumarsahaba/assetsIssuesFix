import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class AgentService extends BaseAPIService {

    getAll(codeWholesaler: string, codeAgent: string, page: number = 0, size: number = 10) {
        return this.httpGetCall(`/agent?page=${page}&size=${size}&codeAgent=${codeAgent}&codeWholesaler=${codeWholesaler}`)
    }

    create(codeAgent: string,
           codeWholesaler: string,
           description: string,
           overdraftMaxDailyCount: string,
           overdraftLimitAmount: number,
           penaltyDelayInDays: number) {
        return this.httpPostCall('/agent/store', {
            codeAgent : codeAgent,
            codeWholesaler : codeWholesaler,
            description : description,
            overdraftMaxDailyCount: overdraftMaxDailyCount,
            overdraftLimitAmount: overdraftLimitAmount,
            penaltyDelayInDays: penaltyDelayInDays,
        })
    }

    update(code: string,
           description: string,
           overdraftMaxDailyCount: string,
           overdraftLimitAmount: number,
           penaltyDelayInDays: number,
           active: boolean,
           codeAgent: string) {
        return this.httpPutCall('/agent/update/' + code, {
            description : description,
            overdraftMaxDailyCount: overdraftMaxDailyCount,
            overdraftLimitAmount: overdraftLimitAmount,
            penaltyDelayInDays: penaltyDelayInDays,
            active: active,
            codeAgent: codeAgent
        })
    }

    show(code: string) {
        return this.httpGetCall('/agent/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/agent/delete/' + code)
    }
}
