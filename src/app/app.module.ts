import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SummaryPipe} from './pipes/summary/summary.pipe';
import {TitleCasePipe} from './pipes/title-case/title-case.pipe';
import {HttpClientModule} from "@angular/common/http";
import {AppErrorHandler} from "./commons/errors/app-error-handler";
import {NotFoundComponent} from './components/pages/not-found/not-found.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "./commons/keycloak-init.factory";
import {HomeComponent} from './components/pages/home/home.component';
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
import { LoanRequestIndexComponent } from './components/resources/loan-request/index/loan-request-index.component';
import { LoanRequestValidationComponent } from './components/resources/loan-request/validation/loan-request-validation.component';

@NgModule({
    declarations: [
        SummaryPipe,
        TitleCasePipe,
        AppComponent,
        NotFoundComponent,
        HomeComponent,
        SidebarComponent,
        NavbarComponent,
        DashboardComponent,
        LenderIndexComponent,
        LenderCreateComponent,
        AggregatorIndexComponent,
        AggregatorCreateComponent,
        ModalComponent,
        WholesalerIndexComponent,
        WholesalerCreateComponent,
        AgentIndexComponent,
        AgentCreateComponent,
        LoanRequestIndexComponent,
        LoanRequestValidationComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        KeycloakAngularModule,
        AppRoutingModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService],
        },
        { provide: ErrorHandler, useClass: AppErrorHandler}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
