import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SummaryPipe} from './pipes/summary/summary.pipe';
import {TitleCasePipe} from './pipes/title-case/title-case.pipe';
import {HttpClientModule} from "@angular/common/http";
import {AppErrorHandler} from "./commons/errors/app-error-handler";
import {NotFoundComponent} from './components/shared/not-found/not-found.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "./commons/keycloak-init.factory";
import {SidebarComponent} from './components/layouts/partials/sidebar/sidebar.component';
import {NavbarComponent} from './components/layouts/partials/navbar/navbar.component';
import {DashboardComponent} from './components/layouts/dashboard/dashboard.component';
import {LenderCreateComponent} from './components/resources/lender/create/lender-create.component';
import {LenderIndexComponent} from './components/resources/lender/index/lender-index.component';
import {ModalComponent} from './components/shared/modal/modal.component';
import {AggregatorIndexComponent} from "./components/resources/aggregator/index/aggregator-index.component";
import {AggregatorCreateComponent} from "./components/resources/aggregator/create/aggregator-create.component";
import {WholesalerIndexComponent} from './components/resources/wholesaler/index/wholesaler-index.component';
import {WholesalerCreateComponent} from './components/resources/wholesaler/create/wholesaler-create.component';
import {AgentIndexComponent} from './components/resources/agent/index/agent-index.component';
import {AgentCreateComponent} from './components/resources/agent/create/agent-create.component';
import {LoanRequestIndexComponent} from './components/resources/loan-request/index/loan-request-index.component';
import {
    LoanRequestValidationComponent
} from './components/resources/loan-request/validation/loan-request-validation.component';
import {OperationsComponent} from './components/account/operations/operations.component';
import {LenderShowComponent} from './components/resources/lender/show/lender-show.component';
import {AgentShowComponent} from "./components/resources/agent/show/agent-show.component";
import {AggregatorShowComponent} from "./components/resources/aggregator/show/aggregator-show.component";
import {WholesalerShowComponent} from "./components/resources/wholesaler/show/wholesaler-show.component";
import {LoanRequestCreateComponent} from './components/resources/loan-request/create/loan-request-create.component';
import {CreditRequestIndexComponent} from "./components/resources/credit-request/index/credit-request-index.component";
import {
    CreditRequestCreateComponent
} from "./components/resources/credit-request/create/credit-request-create.component";
import {WarningComponent} from './components/shared/warning/warning.component';
import {PaginatedResourceComponent} from './components/shared/paginated-resource/paginated-resource.component';
import {CommissionPlanIndexComponent} from './components/account/commission-plan/index/commission-plan-index.component';
import {
    CommissionPlanCreateComponent
} from './components/account/commission-plan/create/commission-plan-create.component';
import {ForbiddenComponent} from './components/shared/forbidden/forbidden.component';
import {RouteReuseStrategy} from "@angular/router";
import {CustomRouteReuseStrategy} from "./commons/custom-route-reuse-strategy";
import {
    ProvisionRequestIndexComponent
} from './components/resources/provision-request/index/provision-request-index.component';
import {
    ProvisionRequestCreateComponent
} from './components/resources/provision-request/create/provision-request-create.component';
import {
    ProvisionRequestValidationComponent
} from './components/resources/provision-request/validation/provision-request-validation.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {
    CreditRequestValidationComponent
} from './components/resources/credit-request/validation/credit-request-validation.component';
import {LenderUpdateComponent} from "./components/resources/lender/update/lender-update.component";
import {AggregatorUpdateComponent} from "./components/resources/aggregator/update/aggregator-update.component";
import {WholesalerUpdateComponent} from "./components/resources/wholesaler/update/wholesaler-update.component";
import {AgentUpdateComponent} from "./components/resources/agent/update/agent-update.component";

@NgModule({
    declarations: [
        SummaryPipe,
        TitleCasePipe,

        AppComponent,
        NotFoundComponent,

        SidebarComponent,
        NavbarComponent,
        DashboardComponent,

        LenderShowComponent,
        LenderIndexComponent,
        LenderCreateComponent,
        LenderUpdateComponent,

        AggregatorIndexComponent,
        AggregatorCreateComponent,
        AggregatorShowComponent,
        AggregatorUpdateComponent,

        ModalComponent,

        WholesalerIndexComponent,
        WholesalerCreateComponent,
        WholesalerShowComponent,
        WholesalerUpdateComponent,

        AgentIndexComponent,
        AgentShowComponent,
        AgentCreateComponent,
        AgentUpdateComponent,

        LoanRequestIndexComponent,
        LoanRequestCreateComponent,
        LoanRequestValidationComponent,

        CreditRequestIndexComponent,
        CreditRequestCreateComponent,

        OperationsComponent,
         WarningComponent,
         PaginatedResourceComponent,
         CommissionPlanIndexComponent,
         CommissionPlanCreateComponent,
         ForbiddenComponent,
         ProvisionRequestIndexComponent,
         ProvisionRequestCreateComponent,
         ProvisionRequestValidationComponent,
         CreditRequestValidationComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        KeycloakAngularModule,
        AppRoutingModule,
        NgxDropzoneModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService],
        },
        {
            provide: RouteReuseStrategy,
            useClass: CustomRouteReuseStrategy
        },
        { provide: ErrorHandler, useClass: AppErrorHandler}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
