import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class OverviewService extends BaseAPIService {

    getCreditRequests(page: number = 0, size: number = 10, codeAgent?: string, codeWholesaler?: string, status?: string, startDate?: string, endDate?: string) {
        return this.httpGetCall(`/overviews/credit/request/search?page=${page}&size=${size}&codeWholesaler=${codeWholesaler}&codeAgent=${codeAgent}&status=${status}&startDate=${startDate}&endDate=${endDate}`);
    }

    getRefundRequests(page: number = 0, size: number = 10, codeAgent?: string, status?: string) {
        return this.httpGetCall(`/overviews/refund/request/search?page=${page}&size=${size}&codeAgent=${codeAgent}&status=${status}`);
    }

    getAllCreditRequests(codeWholesaler?: string,codeAgent?: string,  status?: string) {
        return this.httpGetCall(`/overviews/credit/request/search?codeWholesaler=${codeWholesaler}&codeAgent=${codeAgent}&status=${status}`);
    }
}
