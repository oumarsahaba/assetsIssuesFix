import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";
import {DashboardIndexComponent} from "./index/dashboard-index.component";

const routes: Routes = [
    { path: 'dashboard', component: DashboardIndexComponent, canActivate: [AuthGuard], data: {roles: ['admin']} },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
