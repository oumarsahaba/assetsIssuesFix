import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {OperationsComponent} from "./operations/operations.component";
import {CommissionPlanIndexComponent} from "./commission-plan/index/commission-plan-index.component";
import {CommissionPlanCreateComponent} from "./commission-plan/create/commission-plan-create.component";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        OperationsComponent,
        CommissionPlanIndexComponent,
        CommissionPlanCreateComponent,
    ],
    exports: [
        OperationsComponent,
        CommissionPlanIndexComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AccountRoutingModule,
        ReactiveFormsModule
    ]
})
export class AccountModule {
}
