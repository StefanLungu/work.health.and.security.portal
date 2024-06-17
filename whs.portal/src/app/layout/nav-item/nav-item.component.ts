import { Component, Input, inject } from "@angular/core";
import { IModelNavItem } from "./models/nav-item.model";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { NavigationService } from "@root/core/services/navigation.service";

@Component({
    selector: "whs-nav-item",
    templateUrl: "nav-item.component.html",
    styleUrls: ["nav-item.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class WHSNavItemComponent {

    // dependencies
    private readonly _routerService: Router = inject(Router);
    private readonly _navigationService: NavigationService = inject(NavigationService);

    @Input()
    public navItem: IModelNavItem = {} as IModelNavItem;

    protected navigateToNavItemUrl(): void {
        if (this.navItem.routeUrl) {
            this._routerService.navigate([this.navItem.routeUrl]);
            this._navigationService.close();
        }
    }
}