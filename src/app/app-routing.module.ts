import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "./components/shared/not-found/not-found.component";
import {LenderIndexComponent} from "./components/resources/lender/index/lender-index.component";
import {AggregatorIndexComponent} from "./components/resources/aggregator/index/aggregator-index.component";
import {WholesalerIndexComponent} from "./components/resources/wholesaler/index/wholesaler-index.component";
import {AgentIndexComponent} from "./components/resources/agent/index/agent-index.component";
import {LenderShowComponent} from "./components/resources/lender/show/lender-show.component";
import {WholesalerShowComponent} from "./components/resources/wholesaler/show/wholesaler-show.component";
import {AgentShowComponent} from "./components/resources/agent/show/agent-show.component";
import {AggregatorShowComponent} from "./components/resources/aggregator/show/aggregator-show.component";
import {DashboardGuard} from "./guards/dashboard.guard";
import {ForbiddenComponent} from "./components/shared/forbidden/forbidden.component";

const routes: Routes = [
    {path: '', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard, DashboardGuard]},

    {path: 'lender', component: LenderIndexComponent, canActivate: [AuthGuard], data: {roles: ['admin']} },
    {path: 'lender/:codeLender', component: LenderShowComponent, canActivate: [AuthGuard], data: {roles: ['admin']} },

    {path: 'aggregator', component: AggregatorIndexComponent, canActivate: [AuthGuard], data: {roles: ['admin']} },
    {path: 'aggregator/:codeAggregator', component: AggregatorShowComponent, canActivate: [AuthGuard], data: {roles: ['admin', 'aggregator']} },

    {path: 'wholesaler', component: WholesalerIndexComponent, canActivate: [AuthGuard], data: {roles: ['admin', 'aggregator', 'wholesaler']} },
    {path: 'wholesaler/:codeWholesaler', component: WholesalerShowComponent, canActivate: [AuthGuard], data: {roles: ['admin', 'aggregator', 'wholesaler']} },

    {path: 'agent', component: AgentIndexComponent, canActivate: [AuthGuard], data: {roles: ['admin', 'aggregator', 'wholesaler']} },
    {path: 'agent/:codeAgent', component: AgentShowComponent, canActivate: [AuthGuard], data: {roles: ['admin', 'aggregator', 'wholesaler']} },

    /*{path: 'loan/request', component: LoanRequestIndexComponent, canActivate: [AuthGuard]},*/
    {path: 'not-found', component: NotFoundComponent, title: 'not-found'},
    {path: 'forbidden', component: ForbiddenComponent, title: 'forbidden'},

    {path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
