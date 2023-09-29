import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardIndexComponent} from './index/dashboard-index.component';
import {SharedModule} from "../shared/shared.module";
import {CreditCountChartComponent} from './credit-count-chart/credit-count-chart.component';
import {CreditFluxChartComponent} from "./credit-flux-chart/credit-flux-chart.component";
import {FormsModule} from "@angular/forms";
import {CreditCountByAgentChartComponent} from "./credit-count-by-agent-chart/credit-count-by-agent-chart.component";
import {CreditFluxByAgentChartComponent} from "./credit-flux-by-agent-chart/credit-flux-by-agent-chart.component";


@NgModule({
    declarations: [
        DashboardIndexComponent,
        CreditCountChartComponent,
        CreditCountByAgentChartComponent,
        CreditFluxChartComponent,
        CreditFluxByAgentChartComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule,
        FormsModule
    ]
})
export class DashboardModule {
}
