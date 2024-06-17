import { Routes } from '@angular/router';
import { RoutesDefinitionHelper } from '@core/utils/routes-definition.helper';
import { WHSDashboardComponent } from '@layout/dashboard/dashboard.component';

export const routes: Routes =
[
    {
        path: RoutesDefinitionHelper.ROUTENAME_EMPTY,
        component: WHSDashboardComponent,
        children: [
            {
                path: RoutesDefinitionHelper.ROUTENAME_MANAGEMENT,
                loadComponent: () => import("@modules/management/management.component").then(m => m.ManagementComponent)
            }
        ]
    }
];
