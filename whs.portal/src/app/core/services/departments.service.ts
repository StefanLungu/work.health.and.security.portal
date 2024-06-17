import { Injectable, inject } from "@angular/core";
import { WHSWebApiClient } from "@core/clients/whs-webapi.client";
import { IAPIModelCreateDepartment } from "@core/apimodels/departments/create-department.apimodel";
import { IAPIModelBaseResponse } from "@core/apimodels/common/base-response.apimodel";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class DepartmentsService {

    // dependencies
    private readonly _webApiClient: WHSWebApiClient = inject(WHSWebApiClient);

    public createDepartment(createDepartmentModel: IAPIModelCreateDepartment): Observable<IAPIModelBaseResponse> {
        return this._webApiClient.createDepartment(createDepartmentModel);
    }
}