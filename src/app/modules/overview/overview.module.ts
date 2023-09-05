import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewCreditRequestIndexComponent } from './credit-request/index/overview-credit-request-index.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        OverviewCreditRequestIndexComponent
    ],
    imports: [
        CommonModule,
        OverviewRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class OverviewModule { }
