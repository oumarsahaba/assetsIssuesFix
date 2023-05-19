import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "./components/pages/not-found/not-found.component";
import {LenderIndexComponent} from "./components/resources/lender/index/lender-index.component";
import {AggregatorIndexComponent} from "./components/resources/aggregator/index/aggregator-index.component";
import {WholesalerIndexComponent} from "./components/resources/wholesaler/index/wholesaler-index.component";
import {AgentIndexComponent} from "./components/resources/agent/index/agent-index.component";
import {LoanRequestIndexComponent} from "./components/resources/loan-request/index/loan-request-index.component";
import {LenderDetailsComponent} from "./components/resources/lender/details/lender-details.component";
import {WholesalerDetailsComponent} from "./components/resources/wholesaler/details/wholesaler-details.component";
import {AgentDetailsComponent} from "./components/resources/agent/details/agent-details.component";
import {AggregatorDetailsComponent} from "./components/resources/aggregator/details/aggregator-details.component";

const routes: Routes = [
    {path: '', redirectTo: 'lender', pathMatch: "full"},
    {path: 'lender', component: LenderIndexComponent, canActivate: [AuthGuard]},
    {path: 'lender/:codeLender/details/:accountSlug', component: LenderDetailsComponent, canActivate: [AuthGuard]},

    {path: 'aggregator', component: AggregatorIndexComponent, canActivate: [AuthGuard]},
    {path: 'aggregator/:codeAggregator/details/:accountSlug', component: AggregatorDetailsComponent, canActivate: [AuthGuard]},

    {path: 'wholesaler', component: WholesalerIndexComponent, canActivate: [AuthGuard]},
    {path: 'wholesaler/:codeWholesaler/details/:accountSlug', component: WholesalerDetailsComponent, canActivate: [AuthGuard]},

    {path: 'agent', component: AgentIndexComponent, canActivate: [AuthGuard]},
    {path: 'agent/:codeAgent/details/:accountSlug', component: AgentDetailsComponent, canActivate: [AuthGuard]},

    {path: 'loan/request', component: LoanRequestIndexComponent, canActivate: [AuthGuard]},
    {path: '**', component: NotFoundComponent, title: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
