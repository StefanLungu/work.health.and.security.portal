import { ResponseStatus } from "./response-status.enum";

export interface IAPIModelBaseResponse {
    responseStatus: ResponseStatus;
    errors?: string[];
}