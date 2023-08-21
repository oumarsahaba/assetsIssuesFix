import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardIndexComponent } from './index/dashboard-index.component';
import {SharedModule} from "../shared/shared.module";
import { CreditCountChartComponent } from './credit-count-chart/credit-count-chart.component';
import {CreditFluxChartComponent} from "./credit-flux-chart/credit-flux-chart.component";


@NgModule({
    declarations: [
        DashboardIndexComponent,
        CreditCountChartComponent,
        CreditFluxChartComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
