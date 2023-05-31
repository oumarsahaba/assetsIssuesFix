import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";
import {CommissionPlan} from "../commons/interfaces/commission-plan";

@Injectable({
  providedIn: 'root'
})
export class CommissionPlanService extends BaseAPIService {

    getAll(code: string, type: string, page: number = 0, size: number = 10) {
        return this.httpGetCall(`/commission/plan?code=${code}&type=${type}&page=${page}&size=${size}`)
    }

    create(commissionPlan: CommissionPlan) {
        return this.httpPostCall('/commission/plan/store', commissionPlan)
    }

}
