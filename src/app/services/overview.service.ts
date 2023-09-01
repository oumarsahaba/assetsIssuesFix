import { Injectable } from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class OverviewService extends BaseAPIService{

    getCreditRequests(page: number = 0, size: number = 10) {
        return this.httpGetCall(`/overviews/credit/request?page=${page}&size=${size}`)
    }

}
