import { Injectable } from '@angular/core';
import { AppSettings } from '../models/appsettings.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BillingDetail } from '../models/billingDetail.model';

@Injectable()
export class BillingsService {
    readonly apiEndPoint : string = AppSettings.API_URL + "/billings/";
    
    //TODO: remove this variable when API is tied to test or production environment
    readonly apiKey : string = "?key=3d8443e0";

    readonly httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    getAll() {
        const uri = this.apiEndPoint + "/getall/" + this.apiKey;
        return this.http.get<BillingDetail[]>(uri, this.httpOptions);
    }

    update(billing : BillingDetail) {
        const uri = this.apiEndPoint + "/update/";
        return this.http.put<boolean>(uri, JSON.stringify(billing), this.httpOptions);
    }

    save(billing : BillingDetail) {
        const uri = this.apiEndPoint + "/save/";
        return this.http.post<boolean>(uri, JSON.stringify(billing), this.httpOptions);
    }

    delete(billing : BillingDetail) {
        const uri = this.apiEndPoint + "/delete/" + billing.Id;
        return this.http.delete<boolean>(uri, this.httpOptions);
    }
}