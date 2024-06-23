import { Injectable, inject } from "@angular/core";
import { WHSWebApiClient } from "@core/clients/whs-webapi.client";
import { IAPIModelCreateDepartment } from "@core/apimodels/departments/create-department.apimodel";
import { IAPIModelBaseResponse } from "@core/apimodels/common/base-response.apimodel";
import { Observable, map } from "rxjs";
import { IAPIModelFindDepartments } from "../apimodels/departments/find-departments.apimodel";
import { IModelPaginatedResult } from "../apimodels/common/paginated-result.apimodel";
import { IModelDepartmentTreeNode } from "../models/departments/department-tree-node.model";
import { IAPIModelDepartment } from "../apimodels/departments/department.apimodel";

@Injectable({ providedIn: "root" })
export class DepartmentsService {

    // dependencies
    private readonly _webApiClient: WHSWebApiClient = inject(WHSWebApiClient);

    public createDepartment(createDepartmentModel: IAPIModelCreateDepartment): Observable<IAPIModelBaseResponse> {
        return this._webApiClient.createDepartment(createDepartmentModel);
    }

    public findDepartmentTreeNodes(findModel: IAPIModelFindDepartments, level: number): Observable<IModelPaginatedResult<IModelDepartmentTreeNode>> {
        return this._webApiClient.findDepartments(findModel)
            .pipe(map((result: IModelPaginatedResult<IAPIModelDepartment>) => (<IModelPaginatedResult<IModelDepartmentTreeNode>>{
                values: result.values.map(dep => <IModelDepartmentTreeNode>{
                    label: dep.name,
                    level: level,
                    item: dep,
                    isSelected: false,
                    expandable: true,
                    isLoading: false,
                    children: []
                }),
                totalCount: result.totalCount
            })))
    }
}