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

    update(code: string, codeWholesaler: string, description: string, active: string) {
        return this.httpPutCall('/wholesaler/update/' + code, {
            codeWholesaler: codeWholesaler,
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
}
