import { Injectable } from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseAPIService {

  getMetrics(){
      return this.httpGetCall(`/dashboard/metrics`)
  }

  getCreditCountChartData(dayBefore: number){
      return this.httpGetCall(`/dashboard/stats/credit/count?dayBefore=${dayBefore}`)
  }
  getCreditFluxChartData(dayBefore: number){
      return this.httpGetCall(`/dashboard/stats/credit/flux?dayBefore=${dayBefore}`)
  }
}
