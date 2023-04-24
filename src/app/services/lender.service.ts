import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class LenderService extends BaseAPIService {
    getAll() {
        return this.httpGetCall('/lender')
    }

    create(code: string, description: string) {
        return this.httpPostCall('/lender/store', {
            codeLender : code,
            description : description
        })
    }

    update(code: string, description: string) {
        return this.httpPutCall('/lender/update/' + code, {
            description : description
        })
    }

    show(code: string) {
        return this.httpGetCall('/lender/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/lender/delete/' + code)
    }
}
