import { Injectable } from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class ProvisionRequestService extends BaseAPIService {

    getAll(codeLender: string, page: number = 0, size: number = 5) {
        return this.httpGetCall(`/provision/request/${codeLender}?page=${page}&size=${size}`)
    }

    create(codeLender: string, amount: number, files: File[]) {
        const formData = new FormData();

        formData.append('codeLender', codeLender)
        formData.append('amount', String(amount))

        files.forEach(file => formData.append('files[]', file))

        return this.httpPostFormDataCall('/provision/request/store', formData)
    }

    show(token: string) {
        return this.httpGetCall(`/provision/request/show/${token}`)
    }

    validate(token: string, status: string) {
        return this.httpPostCall('/provision/request/validate', {
            token: token,
            status: status
        })
    }
}
