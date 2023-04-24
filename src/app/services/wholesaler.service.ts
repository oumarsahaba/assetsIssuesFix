import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class WholesalerService extends BaseAPIService{
    getAll() {
        return this.httpGetCall('/wholesaler')
    }

    create(codeWholesaler: string, codeAggregator: string, codeLender: string, description: string) {
        return this.httpPostCall('/wholesaler/store', {
            codeWholesaler : codeWholesaler,
            codeAggregator : codeAggregator,
            codeLender : codeLender,
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
