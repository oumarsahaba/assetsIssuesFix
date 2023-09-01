import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LenderCreateComponent} from './lender/create/lender-create.component';
import {LenderIndexComponent} from './lender/index/lender-index.component';
import {LenderShowComponent} from './lender/show/lender-show.component';
import {LenderUpdateComponent} from "./lender/update/lender-update.component";
import {AggregatorIndexComponent} from "./aggregator/index/aggregator-index.component";
import {AggregatorCreateComponent} from "./aggregator/create/aggregator-create.component";
import {AggregatorShowComponent} from "./aggregator/show/aggregator-show.component";
import {AggregatorUpdateComponent} from "./aggregator/update/aggregator-update.component";
import {WholesalerIndexComponent} from './wholesaler/index/wholesaler-index.component';
import {WholesalerCreateComponent} from './wholesaler/create/wholesaler-create.component';
import {AgentIndexComponent} from './agent/index/agent-index.component';
import {AgentCreateComponent} from './agent/create/agent-create.component';
import {LoanRequestIndexComponent} from './loan-request/index/loan-request-index.component';
import {LoanRequestValidationComponent} from './loan-request/validation/loan-request-validation.component';
import {AgentShowComponent} from "./agent/show/agent-show.component";
import {AgentUpdateComponent} from "./agent/update/agent-update.component";
import {WholesalerShowComponent} from "./wholesaler/show/wholesaler-show.component";
import {LoanRequestCreateComponent} from './loan-request/create/loan-request-create.component';
import {OverdraftRequestIndexComponent} from "./overdraft-request/index/overdraft-request-index.component";
import {CreditRequestCreateComponent} from "./overdraft-request/create/credit-request-create.component";
import {ProvisionRequestIndexComponent} from './provision-request/index/provision-request-index.component';
import {ProvisionRequestCreateComponent} from './provision-request/create/provision-request-create.component';
import {ProvisionRequestValidationComponent} from './provision-request/validation/provision-request-validation.component';
import {CreditRequestValidationComponent} from './overdraft-request/validation/credit-request-validation.component';
import {WholesalerUpdateComponent} from "./wholesaler/update/wholesaler-update.component";

import { ResourcesRoutingModule } from './resources-routing.module';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AccountModule} from "../account/account.module";
import {NgxDropzoneModule} from "ngx-dropzone";


@NgModule({
    declarations: [
        LenderCreateComponent,
        LenderIndexComponent,
        LenderShowComponent,
        LenderUpdateComponent,
        AggregatorIndexComponent,
        AggregatorCreateComponent,
        AggregatorShowComponent,
        AggregatorUpdateComponent,
        WholesalerIndexComponent,
        WholesalerCreateComponent,
        AgentIndexComponent,
        AgentCreateComponent,
        LoanRequestIndexComponent,
        LoanRequestValidationComponent,
        AgentShowComponent,
        AgentUpdateComponent,
        WholesalerShowComponent,
        LoanRequestCreateComponent,
        OverdraftRequestIndexComponent,
        CreditRequestCreateComponent,
        ProvisionRequestIndexComponent,
        ProvisionRequestCreateComponent,
        ProvisionRequestValidationComponent,
        CreditRequestValidationComponent,
        WholesalerUpdateComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ResourcesRoutingModule,
        ReactiveFormsModule,
        AccountModule,
        NgxDropzoneModule
    ]
})
export class ResourcesModule { }
