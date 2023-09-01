import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";
import {OverviewCreditRequestIndexComponent} from "./credit-request/index/overview-credit-request-index.component";

const routes: Routes = [
    {path: 'overview/credit-request', component: OverviewCreditRequestIndexComponent, canActivate: [AuthGuard], data: {roles: ['admin']} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
