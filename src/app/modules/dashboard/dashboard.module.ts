import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardIndexComponent } from './index/dashboard-index.component';
import {SharedModule} from "../shared/shared.module";
import { CreditChartComponent } from './credit-chart/credit-chart.component';


@NgModule({
  declarations: [
    DashboardIndexComponent,
    CreditChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
