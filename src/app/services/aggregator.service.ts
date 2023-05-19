import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class AggregatorService extends BaseAPIService{
    getAll() {
        return this.httpGetCall('/aggregator')
    }

    create(code: string, webhook: string, description: string) {
        return this.httpPostCall('/aggregator/store', {
            codeAggregator : code,
            webhook : webhook,
            description : description
        })
    }

    update(code: string, description: string) {
        return this.httpPutCall('/aggregator/update/' + code, {
            description : description
        })
    }

    show(code: string) {
        return this.httpGetCall('/aggregator/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/aggregator/delete/' + code)
    }
}
