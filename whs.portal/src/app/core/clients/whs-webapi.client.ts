import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { IAPIModelCreateDepartment } from "../apimodels/departments/create-department.apimodel";
import { Observable } from "rxjs";
import { IAPIModelBaseResponse } from "../apimodels/common/base-response.apimodel";
import { HttpClient } from "@angular/common/http";

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
    //#endregion
}