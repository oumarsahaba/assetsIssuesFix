import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LenderIndexComponent} from "./lender/index/lender-index.component";
import {AuthGuard} from "../../guards/auth.guard";
import {LenderShowComponent} from "./lender/show/lender-show.component";
import {AggregatorIndexComponent} from "./aggregator/index/aggregator-index.component";
import {AggregatorShowComponent} from "./aggregator/show/aggregator-show.component";
import {WholesalerIndexComponent} from "./wholesaler/index/wholesaler-index.component";
import {WholesalerShowComponent} from "./wholesaler/show/wholesaler-show.component";
import {AgentIndexComponent} from "./agent/index/agent-index.component";
import {AgentShowComponent} from "./agent/show/agent-show.component";

const routes: Routes = [
    {path: 'lender', component: LenderIndexComponent, canActivate: [AuthGuard], data: {roles: ['admin']}},
    {path: 'lender/:codeLender', component: LenderShowComponent, canActivate: [AuthGuard], data: {roles: ['admin']}},

    {path: 'aggregator', component: AggregatorIndexComponent, canActivate: [AuthGuard], data: {roles: ['admin']}},
    {
        path: 'aggregator/:codeAggregator',
        component: AggregatorShowComponent,
        canActivate: [AuthGuard],
        data: {roles: ['admin', 'aggregator']}
    },

    {
        path: 'wholesaler',
        component: WholesalerIndexComponent,
        canActivate: [AuthGuard],
        data: {roles: ['admin', 'aggregator', 'wholesaler']}
    },
    {
        path: 'wholesaler/:codeWholesaler',
        component: WholesalerShowComponent,
        canActivate: [AuthGuard],
        data: {roles: ['admin', 'aggregator', 'wholesaler']}
    },

    {
        path: 'agent',
        component: AgentIndexComponent,
        canActivate: [AuthGuard],
        data: {roles: ['admin', 'aggregator', 'wholesaler']}
    },
    {
        path: 'agent/:codeAgent',
        component: AgentShowComponent,
        canActivate: [AuthGuard],
        data: {roles: ['admin', 'aggregator', 'wholesaler']}
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResourcesRoutingModule {
}
