import { Component, Input } from "@angular/core";
import { IModelNavItem } from "./models/nav-item.model";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

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

    @Input()
    public navItem: IModelNavItem = {} as IModelNavItem;


}