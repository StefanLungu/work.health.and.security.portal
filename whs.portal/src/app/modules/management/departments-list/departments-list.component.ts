import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { SidePanelService } from "@core/services/side-panel.service";
import { AddDepartmentComponent } from "@modules/management/departments-list/add-department/add-department.component";

@Component({
    standalone: true,
    selector: "departments-list",
    templateUrl: "departments-list.component.html",
    styleUrls: ["departments-list.component.scss"],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class DepartmentsListComponent {

    // dependencies
    private readonly _sidePanelService: SidePanelService = inject(SidePanelService);

    protected openAddDepartmentForm(): void {
        this._sidePanelService.openAsync(AddDepartmentComponent);
    }
}