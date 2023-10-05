import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends BaseAPIService {
    getMetrics() {
        return this.httpGetCall(`/dashboard/metrics`)
    }

    getCreditCountChartData(dayBefore: number) {
        return this.httpGetCall(`/dashboard/stats/credit/count?dayBefore=${dayBefore}`)
    }

    getCreditFluxChartData(dayBefore: number) {
        return this.httpGetCall(`/dashboard/stats/credit/flux?dayBefore=${dayBefore}`)
    }

    getCreditCountByAgentChartData(dayBefore: number) {
        return this.httpGetCall(`/dashboard/stats/credit/count/agent?dayBefore=${dayBefore}`)
    }

    getCreditFluxByAgentChartData(dayBefore: number) {
        return this.httpGetCall(`/dashboard/stats/credit/flux/agent?dayBefore=${dayBefore}`)
    }

    getCreditCountByWholesalerChartData(dayBefore: number) {
        return this.httpGetCall(`/dashboard/stats/credit/count/wholesaler?dayBefore=${dayBefore}`)
    }

    getCreditFluxByWholesalerChartData(dayBefore: number) {
        return this.httpGetCall(`/dashboard/stats/credit/flux/wholesaler?dayBefore=${dayBefore}`)
    }
}
