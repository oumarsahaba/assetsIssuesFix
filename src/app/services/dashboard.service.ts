import { Injectable } from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseAPIService {

  getMetrics(){
      return this.httpGetCall(`/dashboard/metrics`)
  }

  getCreditCountChartData(period: string){
      return this.httpGetCall(`/dashboard/stats/credit/count`)
  }
  getCreditFluxChartData(){
      return this.httpGetCall(`/dashboard/stats/credit/flux`)
  }
}
