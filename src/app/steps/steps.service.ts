import { Injectable } from '@angular/core';
import { AppSettings } from '../models/appsettings.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BillingDetail } from '../models/billingDetail.model';

@Injectable()
export class BillingDetailService {
    readonly apiEndPoint : string = AppSettings.API_URL + "/billings/";

    //TODO: remove this variable when API is tied to test or production environment
    readonly apiKey : string = "?key=3d8443e0";

    readonly httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    getBillingNumber() {
        const uri = this.apiEndPoint + "/get/new/" + this.apiKey;
        return this.http.get<BillingDetail>(uri, this.httpOptions);
    }
}