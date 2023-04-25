import { Injectable } from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class LoanRequestService extends BaseAPIService {
    getAll() {
        return this.httpGetCall('/loan/request')
    }

    validate(token: string, status: string) {
        return this.httpPostCall('/loan/request/validate', {
            token: token,
            status: status
        })
    }
}
