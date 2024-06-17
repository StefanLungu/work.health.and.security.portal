import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { DepartmentDetailsComponent } from "@modules/management/department-details/department-details.component";
import { DepartmentsListComponent } from "@modules/management/departments-list/departments-list.component";

@Component({
    standalone: true,
    templateUrl: "management.component.html",
    styleUrls: ["management.component.scss"],
    imports: [
        MatCardModule,
        DepartmentDetailsComponent,
        DepartmentsListComponent
    ]
})
export class ManagementComponent {}