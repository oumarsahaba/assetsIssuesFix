import { Injectable } from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class RefundRequestService extends BaseAPIService {

    getAll(codeAgent: string, page: number = 0, size: number = 5) {
        return this.httpGetCall(`/refund/request/${codeAgent}?page=${page}&size=${size}`)
    }
}
