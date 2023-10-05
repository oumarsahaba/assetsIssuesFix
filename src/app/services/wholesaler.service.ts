import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class WholesalerService extends BaseAPIService {
    getAll() {
        return this.httpGetCall(`/wholesaler`)
    }

    getPage(codeWholesaler: string, page: number = 0, size: number = 10) {
        return this.httpGetCall(`/wholesaler/getPage?page=${page}&size=${size}&codeWholesaler=${codeWholesaler}`)
    }

    create(codeWholesaler: string, codeAggregator: string, description: string) {
        return this.httpPostCall('/wholesaler/store', {
            codeWholesaler: codeWholesaler,
            codeAggregator: codeAggregator,
            description: description
        })
    }

    update(code: string, codeWholesaler: string, codeAggregator: string, description: string, active: string) {
        return this.httpPutCall('/wholesaler/update/' + code, {
            codeWholesaler: codeWholesaler,
            codeAggregator: codeAggregator,
            active: active,
            description: description
        })
    }

    show(code: string) {
        return this.httpGetCall('/wholesaler/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/wholesaler/delete/' + code)
    }

    bulkSettings(codeWholesaler: string, overdraftMaxDailyCount: number, overdraftLimitAmount: number,
                 overdraftBillingOccurrence: number, penaltyDelayInDays: number) {
        return this.httpPostCall('/wholesaler/bulk/settings', {
            codeWholesaler : codeWholesaler,
            overdraftLimitAmount : overdraftLimitAmount,
            overdraftMaxDailyCount: overdraftMaxDailyCount,
            overdraftBillingOccurrence : overdraftBillingOccurrence,
            penaltyDelayInDays : penaltyDelayInDays,

        })
    }
}
