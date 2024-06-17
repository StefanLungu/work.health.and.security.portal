import { AfterViewInit, Component, ViewChild, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from '@angular/material/toolbar';
import { WHSNavItemComponent } from "@layout/nav-item/nav-item.component";
import { IModelNavItem } from "../nav-item/models/nav-item.model";
import { NAV_ITEMS } from "@core/utils/nav-items.helper";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";
import { NavigationService } from "@root/core/services/navigation.service";
import { RouterOutlet } from "@angular/router";
import { SidePanelContentDirective } from "@root/core/directives/sidepanel-content.directive";
import { SidePanelInstanceDirective } from "@root/core/directives/sidepanel-instance.directive";

@Component({
    selector: "whs-dashboard",
    templateUrl: "dashboard.component.html",
    styleUrls: ["dashboard.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        WHSNavItemComponent,
        MatListModule,
        RouterOutlet,
        SidePanelContentDirective,
        SidePanelInstanceDirective
    ]
})
export class WHSDashboardComponent implements AfterViewInit {

    // dependencies
    private readonly _navigationService: NavigationService = inject(NavigationService);

    @ViewChild('menu') sideNav: MatSidenav | undefined;

    protected navItems: IModelNavItem[] = NAV_ITEMS;

    public ngAfterViewInit(): void {
        if (this.sideNav) {
            this._navigationService.setSideNavInstance(this.sideNav);
        }
    }

}