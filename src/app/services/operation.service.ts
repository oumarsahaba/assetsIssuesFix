import { Injectable } from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class OperationService extends BaseAPIService{
    getAccountOperations(accountSlug: string) {
        return this.httpGetCall('/operation/account/' + accountSlug)
    }
}
