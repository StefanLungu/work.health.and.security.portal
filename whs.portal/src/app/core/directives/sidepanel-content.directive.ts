import { Directive, ViewContainerRef } from "@angular/core";
import { SidePanelService } from "@core/services/side-panel.service";

@Directive({
    selector: "ng-container[sidePanelContent]",
    standalone: true
})
export class SidePanelContentDirective {

    constructor(private element: ViewContainerRef, private _sidePanelService: SidePanelService){
        _sidePanelService.sidePanelContent = element;
    }
}