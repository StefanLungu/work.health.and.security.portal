import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { IAPIModelCreateDepartment } from "@core/apimodels/departments/create-department.apimodel";
import { Observable } from "rxjs";
import { IAPIModelBaseResponse } from "@core/apimodels/common/base-response.apimodel";
import { HttpClient } from "@angular/common/http";
import { IAPIModelFindDepartments } from "@core/apimodels/departments/find-departments.apimodel";
import { IAPIModelDepartment } from "@core/apimodels/departments/department.apimodel";
import { IModelPaginatedResult } from "@core/apimodels/common/paginated-result.apimodel";

@Injectable({ providedIn: "root" })
export class WHSWebApiClient {

    // dependencies
    private readonly _httpClient: HttpClient = inject(HttpClient);

    private readonly _baseApiUrl: string = environment.webApiOrigin;
    private readonly _departmentsEndpoint: string = `${this._baseApiUrl}/departments`;

    //#region [ Departments ]
    public createDepartment(createModel: IAPIModelCreateDepartment): Observable<IAPIModelBaseResponse> {
        return this._httpClient.post<IAPIModelBaseResponse>(`${this._departmentsEndpoint}/create`, createModel);
    }

    public findDepartments(findModel: IAPIModelFindDepartments): Observable<IModelPaginatedResult<IAPIModelDepartment>> {
        return this._httpClient.post<IModelPaginatedResult<IAPIModelDepartment>>(`${this._departmentsEndpoint}/find`, findModel);
    }
    //#endregion
}