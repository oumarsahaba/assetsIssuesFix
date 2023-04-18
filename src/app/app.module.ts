import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SummaryPipe } from './pipes/summary/summary.pipe';
import { TitleCasePipe } from './pipes/title-case/title-case.pipe';
import {HttpClientModule} from "@angular/common/http";
import {AppErrorHandler} from "./commons/errors/app-error-handler";
import {RouterModule} from "@angular/router";
import { NotFoundComponent } from './components/not-found/not-found.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "./commons/keycloak-init.factory";
import {AuthGuard} from "./guards/auth.guard";
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/layouts/partials/sidebar/sidebar.component';
import { NavbarComponent } from './components/layouts/partials/navbar/navbar.component';
import { DashboardComponent } from './components/layouts/dashboard/dashboard.component';

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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        KeycloakAngularModule,
        RouterModule.forRoot([
            {path: '', component: HomeComponent, canActivate: [AuthGuard]},
            {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
            {path: '**', component: NotFoundComponent},
        ])
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
