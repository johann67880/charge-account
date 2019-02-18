import { Injectable } from '@angular/core';
import { AppSettings } from '../models/appsettings.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Company } from '../models/company.model';

@Injectable()
export class CompanyService {
    readonly apiEndPoint : string = AppSettings.API_URL + "/companies/";

    readonly httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    };

    //TODO: remove this variable when API is tied to test or production environment
    readonly apiKey : string = "?key=3d8443e0";

    constructor(private http: HttpClient) { }

    getAll() {
        const uri = this.apiEndPoint + "/getall/" + this.apiKey;
        return this.http.get<Company[]>(uri, this.httpOptions);
    }

    update(company : Company) {
        const uri = this.apiEndPoint + "/update/";
        return this.http.put<boolean>(uri, JSON.stringify(company), this.httpOptions);
    }

    save(company : Company) {
        const uri = this.apiEndPoint + "/save/";
        return this.http.post<boolean>(uri, JSON.stringify(company), this.httpOptions);
    }

    delete(company : Company) {
        const uri = this.apiEndPoint + "/delete/" + company.Id;
        return this.http.delete<boolean>(uri, this.httpOptions);
    }
}