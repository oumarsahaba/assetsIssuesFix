import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "./components/pages/not-found/not-found.component";
import {LenderIndexComponent} from "./components/resources/lender/index/lender-index.component";
import {AggregatorIndexComponent} from "./components/resources/aggregator/index/aggregator-index.component";
import {WholesalerIndexComponent} from "./components/resources/wholesaler/index/wholesaler-index.component";

const routes: Routes = [
    {path: '', redirectTo: 'lender', pathMatch: "full"},
    {path: 'lender', component: LenderIndexComponent, canActivate: [AuthGuard]},
    {path: 'aggregator', component: AggregatorIndexComponent, canActivate: [AuthGuard]},
    {path: 'wholesaler', component: WholesalerIndexComponent, canActivate: [AuthGuard]},
    {path: '**', component: NotFoundComponent, title: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
