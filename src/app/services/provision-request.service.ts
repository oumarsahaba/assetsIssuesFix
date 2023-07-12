import { Injectable } from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class ProvisionRequestService extends BaseAPIService {

    getAll(codeLender: string, page: number = 0, size: number = 5) {
        return this.httpGetCall(`/provision/request/${codeLender}?page=${page}&size=${size}`)
    }

    create(codeLender: string, amount: number) {
        return this.httpPostCall('/provision/request/store', {
            codeLender : codeLender,
            amount : amount,
        })
    }

    validate(token: string, status: string) {
        return this.httpPostCall('/provision/request/validate', {
            token: token,
            status: status
        })
    }
}
