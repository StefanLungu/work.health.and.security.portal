import { Directive } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { SidePanelService } from "@core/services/side-panel.service";

@Directive({
    selector: "mat-sidenav[sidePanelInstance]",
    standalone: true
})
export class SidePanelInstanceDirective {

    constructor(private element: MatSidenav, private _sidePanelService: SidePanelService){
        _sidePanelService.sidePanelInstance = element;
    }
}