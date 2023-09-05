import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class AgentService extends BaseAPIService {

    getAll(page: number = 0, size: number = 10) {
        return this.httpGetCall(`/agent?page=${page}&size=${size}`)
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

    update(codeAgent: string,
           description: string,
           overdraftMaxDailyCount: string,
           overdraftLimitAmount: number,
           penaltyDelayInDays: number,
           active: boolean) {
        return this.httpPutCall('/agent/update/' + codeAgent, {
            description : description,
            overdraftMaxDailyCount: overdraftMaxDailyCount,
            overdraftLimitAmount: overdraftLimitAmount,
            penaltyDelayInDays: penaltyDelayInDays,
            active: active,
        })
    }

    show(code: string) {
        return this.httpGetCall('/agent/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/agent/delete/' + code)
    }
}
