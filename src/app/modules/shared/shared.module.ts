import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatedResourceComponent} from './paginated-resource/paginated-resource.component';
import {ModalComponent} from './modal/modal.component';
import {WarningComponent} from './warning/warning.component';
import {NotFoundComponent} from "./not-found/not-found.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";

import {SharedRoutingModule} from './shared-routing.module';
import {SidebarComponent} from "./layouts/partials/sidebar/sidebar.component";
import {NavbarComponent} from "./layouts/partials/navbar/navbar.component";
import {MainComponent} from "./layouts/main/main.component";
import {TabContainerComponent} from './tabs/container/tab-container.component';
import {TabItemComponent} from './tabs/item/tab-item.component';
import {DetailCardsComponent} from './detail-cards/detail-cards.component';
import {TableLoaderComponent} from './table-loader/table-loader.component';
import {ChartLoaderComponent} from './chart-loader/chart-loader.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb/breadcrumb.component';
import {ActionsDropdownComponent} from "./actions-dropdown/actions-dropdown.component";
import { InfoComponent } from './info/info.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
    declarations: [
        ModalComponent,
        NotFoundComponent,
        WarningComponent,
        PaginatedResourceComponent,
        ForbiddenComponent,
        SidebarComponent,
        NavbarComponent,
        MainComponent,
        TabContainerComponent,
        TabItemComponent,
        DetailCardsComponent,
        TableLoaderComponent,
        ChartLoaderComponent,
        BreadcrumbComponent,
        ActionsDropdownComponent,
        InfoComponent,
        ErrorComponent,
    ],
    imports: [
        CommonModule,
        SharedRoutingModule
    ],
    exports: [
        ModalComponent,
        NotFoundComponent,
        WarningComponent,
        PaginatedResourceComponent,
        ForbiddenComponent,
        MainComponent,
        TabContainerComponent,
        TabItemComponent,
        DetailCardsComponent,
        TableLoaderComponent,
        ChartLoaderComponent,
        ActionsDropdownComponent,
        InfoComponent,
        ErrorComponent
    ],
})
export class SharedModule {
}
