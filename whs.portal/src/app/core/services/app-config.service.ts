import { Injectable, inject } from "@angular/core";
import { IAPIModelPortalConfiguration } from "../apimodels/configuration/portal-configuration.apimodel";
import { HttpBackend, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: "root" })
export class AppConfigService {

    // dependencies
    private readonly _httpBackend: HttpBackend = inject(HttpBackend);

    private _portalConfiguration: IAPIModelPortalConfiguration = {} as IAPIModelPortalConfiguration;
    private readonly _baseApiUrl: string = environment.webApiOrigin;
    private readonly _httpClient: HttpClient = new HttpClient(this._httpBackend);
    private readonly _configurationEndpointUrl: string = `${this._baseApiUrl}/configuration`;

    public async loadPortalConfiguration(): Promise<void> {
        try{
            const config = await firstValueFrom(this._httpClient.get(this._configurationEndpointUrl, { responseType: 'json'}));

            this._portalConfiguration = config as IAPIModelPortalConfiguration;
        } catch(err) {
            return await Promise.reject(err);
        }
    }

    public getPortalConfiguration(): IAPIModelPortalConfiguration {
        return this._portalConfiguration;
    }
}