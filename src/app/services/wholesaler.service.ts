import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class WholesalerService extends BaseAPIService{
    getAll() {
        return this.httpGetCall(`/wholesaler`)
    }

    getPage(page: number = 0, size: number = 10) {
        return this.httpGetCall(`/wholesaler/getPage?page=${page}&size=${size}`)
    }

    create(codeWholesaler: string, codeAggregator: string, description: string) {
        return this.httpPostCall('/wholesaler/store', {
            codeWholesaler : codeWholesaler,
            codeAggregator : codeAggregator,
            description : description
        })
    }

    update(code: string, description: string) {
        return this.httpPutCall('/wholesaler/update/' + code, {
            description : description
        })
    }

    show(code: string) {
        return this.httpGetCall('/wholesaler/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/wholesaler/delete/' + code)
    }
}
