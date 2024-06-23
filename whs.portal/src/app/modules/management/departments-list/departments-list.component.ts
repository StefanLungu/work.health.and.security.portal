import { Component, OnInit, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { SidePanelService } from "@core/services/side-panel.service";
import { AddDepartmentComponent } from "@modules/management/departments-list/add-department/add-department.component";
import { DepartmentsTreeDataSource } from "./departments-tree.datasource";
import { FlatTreeControl } from "@angular/cdk/tree";
import { IModelDepartmentTreeNode } from "@root/core/models/departments/department-tree-node.model";
import { MatTreeModule } from "@angular/material/tree";
import { DepartmentsService } from "@root/core/services/departments.service";
import { Subscription } from "rxjs";
import { AppConfigService } from "@root/core/services/app-config.service";
import { IAPIModelFindDepartments } from "@root/core/apimodels/departments/find-departments.apimodel";
import { IModelPaginatedResult } from "@root/core/apimodels/common/paginated-result.apimodel";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    selector: "departments-list",
    templateUrl: "departments-list.component.html",
    styleUrls: ["departments-list.component.scss"],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTreeModule,
        MatProgressBarModule
    ]
})
export class DepartmentsListComponent implements OnInit {

    // dependencies
    private readonly _sidePanelService: SidePanelService = inject(SidePanelService);
    private readonly _departmentsService: DepartmentsService = inject(DepartmentsService);
    private readonly _appConfigService: AppConfigService = inject(AppConfigService);

    protected isExpandable = (node: IModelDepartmentTreeNode) => node.expandable;
    protected getLevel = (node: IModelDepartmentTreeNode) => node.level;
    protected treeControl: FlatTreeControl<IModelDepartmentTreeNode> = new FlatTreeControl<IModelDepartmentTreeNode>(this.getLevel, this.isExpandable);
    protected dataSource: DepartmentsTreeDataSource = new DepartmentsTreeDataSource(this.treeControl);
    
    private _activeSubscriptions: Subscription[] = [];

    public ngOnInit(): void {
        this.findDepartmentNodes();
    }

    protected async openAddDepartmentForm(parentNode?: IModelDepartmentTreeNode): Promise<void> {
        let componentInstance: AddDepartmentComponent = await this._sidePanelService.openAsync(AddDepartmentComponent);
        componentInstance.parentId = parentNode?.item.uniqueId;
    }

    private findDepartmentNodes(): void {
        const finderModel: IAPIModelFindDepartments = {
            skip: 0,
            pageSize: this._appConfigService.getPortalConfiguration().dropDownPageSize
        };

        this._activeSubscriptions.push(this._departmentsService.findDepartmentTreeNodes(finderModel, 0).subscribe({
            next: (result: IModelPaginatedResult<IModelDepartmentTreeNode>) => {
                this.dataSource.data = result.values;
            }
        }));
    }
}