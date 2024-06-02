import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from '@angular/material/toolbar';
import { WHSNavItemComponent } from "@layout/nav-item/nav-item.component";
import { IModelNavItem } from "../nav-item/models/nav-item.model";
import { NAV_ITEMS } from "@core/utils/nav-items.helper";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";

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
        MatListModule
    ]
})
export class WHSDashboardComponent{

    protected navItems: IModelNavItem[] = NAV_ITEMS;
}