import { Injectable } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";

@Injectable({ providedIn: "root" })
export class NavigationService {

    private _sideNav: MatDrawer | undefined;

    public setSideNavInstance(sideNavInstance: MatDrawer): void {
        this._sideNav = sideNavInstance;
    }

    public close() {
        this._sideNav!.close();
    }

    public open() {
        this._sideNav!.open();
    }
}