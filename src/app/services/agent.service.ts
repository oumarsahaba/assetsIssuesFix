import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class AgentService extends BaseAPIService {


    getAll(codeAggregator: string,  codeAgent: string,codeWholesaler: string, page: number = 0, size: number = 10) {
        return this.httpGetCall(`/agent?page=${page}&size=${size}&codeAggregator=${codeAggregator}&codeAgent=${codeAgent}&codeWholesaler=${codeWholesaler}`)
    }

    create(codeAgent: string,
           codeWholesaler: string,
           description: string,
           overdraftMaxDailyCount: string,
           overdraftLimitAmount: number,
           overdraftBillingOccurrence: number,
           penaltyDelayInDays: number) {
        return this.httpPostCall('/agent/store', {
            codeAgent: codeAgent,
            codeWholesaler: codeWholesaler,
            description: description,
            overdraftMaxDailyCount: overdraftMaxDailyCount,
            overdraftLimitAmount: overdraftLimitAmount,
            overdraftBillingOccurrence: overdraftBillingOccurrence,
            penaltyDelayInDays: penaltyDelayInDays,
        })
    }

    update(code: string,
           codeWholesaler: string,
           codeAgent: string,
           description: string,
           overdraftMaxDailyCount: string,
           overdraftLimitAmount: number,
           overdraftBillingOccurrence: number,
           penaltyDelayInDays: number,
           active: boolean) {
        return this.httpPutCall('/agent/update/' + code, {
            codeWholesaler: codeWholesaler,
            codeAgent: codeAgent,
            description: description,
            overdraftMaxDailyCount: overdraftMaxDailyCount,
            overdraftLimitAmount: overdraftLimitAmount,
            overdraftBillingOccurrence: overdraftBillingOccurrence,
            penaltyDelayInDays: penaltyDelayInDays,
            active: active
        })
    }

    show(code: string) {
        return this.httpGetCall('/agent/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/agent/delete/' + code)
    }

    getAggregators() {
        return this.httpGetCall('/aggregator');
    }
}
