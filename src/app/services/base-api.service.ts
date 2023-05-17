import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {catchError, tap, throwError} from "rxjs";
import {AppError} from "../commons/errors/app-error";
import {NotFoundError} from "../commons/errors/not-found-error";
import {BadRequestError} from "../commons/errors/bad-request-error";
import {UnprocessableEntityError} from "../commons/errors/unprocessable-entity-error";
import {ApiResponse} from "../commons/interfaces/api-response";


@Injectable({
    providedIn: 'root'
})
export abstract class BaseAPIService {
    //private readonly baseUrl: string = 'http://localhost:8080/api/v1'
    private readonly baseUrl: string = 'https://credit-digital-386211.oa.r.appspot.com/api/v1'
    private httpHeaders : HttpHeaders = new HttpHeaders()

    constructor(private httpClient: HttpClient, private keycloakService: KeycloakService) {
        keycloakService.getToken().then((token) => {
            this.httpHeaders.set('authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json');
        }).catch((err) => throwError(() => new AppError(err)))
    }

    httpGetCall(pathUrl: string) {
        return this.httpClient
            .get<ApiResponse>(this.baseUrl + pathUrl, { headers: this.httpHeaders })
            .pipe(
                catchError((err: Response) => this.handleError(err))
            )
    }

    httpPostCall(pathUrl: string, body: any) {
        return this.httpClient
            .post<ApiResponse>(this.baseUrl + pathUrl, body, { headers: this.httpHeaders})
            .pipe(catchError((err: Response) => this.handleError(err)))
    }

    httpPutCall(pathUrl: string, body: any) {
        return this.httpClient
            .put<ApiResponse>(this.baseUrl + pathUrl, body, { headers: this.httpHeaders })
            .pipe(catchError((err: Response) => this.handleError(err)))
    }

    httpDeleteCall(pathUrl: string) {
        return this.httpClient
            .delete<ApiResponse>(this.baseUrl + pathUrl, { headers: this.httpHeaders })
            .pipe(catchError((err: Response) => this.handleError(err)))
    }

    private handleError(err: Response) {
        switch (err.status) {
            case 400 :
                return throwError(() => new BadRequestError(err))
            case 404 :
                return throwError(() => new NotFoundError())
            case 422 :
                return throwError(() => new UnprocessableEntityError(err))
            default :
                return throwError(() => new AppError(err))
        }
    }
}
