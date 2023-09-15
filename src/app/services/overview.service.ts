import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class OverviewService extends BaseAPIService {

    getCreditRequests(page: number = 0, size: number = 10, codeAgent?: string, codeWholesaler?: string, status?: string) {
        return this.httpGetCall(`/overviews/credit/request/search?page=${page}&size=${size}&codeWholesaler=${codeWholesaler}&codeAgent=${codeAgent}&status=${status}`);
    }
}
