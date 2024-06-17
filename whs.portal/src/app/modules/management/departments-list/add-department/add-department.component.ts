import { Component, Input, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { IModelAddDepartmentFormDefinition } from "./models/add-department-form-definition.model";
import { CommonModule } from "@angular/common";
import { SidePanelService } from "@core/services/side-panel.service";
import { DepartmentsService } from "@core/services/departments.service";
import { IAPIModelCreateDepartment } from "@root/core/apimodels/departments/create-department.apimodel";
import { GuidGeneratorService } from "@root/core/services/guid-generator.service";
import { NotificationService } from "@root/shared/notification/notification.service";
import { IAPIModelBaseResponse } from "@root/core/apimodels/common/base-response.apimodel";
import { HttpErrorResponse } from "@angular/common/http";
import { ResponseStatus } from "@root/core/apimodels/common/response-status.enum";

@Component({
    standalone: true,
    templateUrl: "add-department.component.html",
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class AddDepartmentComponent {

    @Input()
    public parentId: string | undefined;
    
    // dependencies
    private readonly _formBuilder: FormBuilder = inject(FormBuilder);
    private readonly _sidePanelService: SidePanelService = inject(SidePanelService);
    private readonly _departmentsService: DepartmentsService = inject(DepartmentsService);
    private readonly _guidGeneratorService: GuidGeneratorService = inject(GuidGeneratorService);
    private readonly _notificationsService: NotificationService = inject(NotificationService);

    protected createForm: FormGroup<IModelAddDepartmentFormDefinition> = this._formBuilder.group<IModelAddDepartmentFormDefinition>({
        name: new FormControl<string | null>(null, Validators.required)
    });

    protected close(): void { 
        this._sidePanelService.close();
    }

    protected confirm(): void {
        this.createForm.markAllAsTouched();

        if (!this.createForm.valid) {
            return;
        }

        const createModel: IAPIModelCreateDepartment = {
            uniqueId: this._guidGeneratorService.createGuid(),
            parentId: this.parentId,
            name: this.createForm.value.name!
        }

        this._departmentsService.createDepartment(createModel).subscribe({
            next: (result: IAPIModelBaseResponse) => {
                if (result.responseStatus == ResponseStatus.SUCCESS) {
                    this._notificationsService.displayInfo(`Department '${createModel.name}' was created succesfully!`);
                }
            },
            error: (err: HttpErrorResponse) => {
                this._notificationsService.displayError(err.error.errors);
                this._sidePanelService.close();
            },
            complete: () => { 
                this._sidePanelService.close();
            }
        });

        this._sidePanelService.close();
    }

}