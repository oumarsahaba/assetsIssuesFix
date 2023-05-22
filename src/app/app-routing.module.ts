import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "./components/pages/not-found/not-found.component";
import {LenderIndexComponent} from "./components/resources/lender/index/lender-index.component";
import {AggregatorIndexComponent} from "./components/resources/aggregator/index/aggregator-index.component";
import {WholesalerIndexComponent} from "./components/resources/wholesaler/index/wholesaler-index.component";
import {AgentIndexComponent} from "./components/resources/agent/index/agent-index.component";
import {LenderShowComponent} from "./components/resources/lender/show/lender-show.component";
import {WholesalerShowComponent} from "./components/resources/wholesaler/show/wholesaler-show.component";
import {AgentShowComponent} from "./components/resources/agent/show/agent-show.component";
import {AggregatorShowComponent} from "./components/resources/aggregator/show/aggregator-show.component";

const routes: Routes = [
    {path: '', redirectTo: 'lender', pathMatch: "full"},
    {path: 'lender', component: LenderIndexComponent, canActivate: [AuthGuard]},
    {path: 'lender/:codeLender', component: LenderShowComponent, canActivate: [AuthGuard]},

    {path: 'aggregator', component: AggregatorIndexComponent, canActivate: [AuthGuard]},
    {path: 'aggregator/:codeAggregator', component: AggregatorShowComponent, canActivate: [AuthGuard]},

    {path: 'wholesaler', component: WholesalerIndexComponent, canActivate: [AuthGuard]},
    {path: 'wholesaler/:codeWholesaler', component: WholesalerShowComponent, canActivate: [AuthGuard]},

    {path: 'agent', component: AgentIndexComponent, canActivate: [AuthGuard]},
    {path: 'agent/:codeAgent', component: AgentShowComponent, canActivate: [AuthGuard]},

    /*{path: 'loan/request', component: LoanRequestIndexComponent, canActivate: [AuthGuard]},*/
    {path: '**', component: NotFoundComponent, title: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
