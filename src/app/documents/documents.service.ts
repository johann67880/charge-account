import { Injectable } from '@angular/core';
import { AppSettings } from '../models/appsettings.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Document } from '../models/document.model';

@Injectable()
export class CompanyService {
    readonly apiEndPoint : string = AppSettings.API_URL + "/document/";
    readonly user : string = sessionStorage.getItem('user');

    readonly httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    getAll() {
        const uri = this.apiEndPoint + "/getall/"+ this.user;
        return this.http.get<Document[]>(uri, this.httpOptions);
    }

    update(document : Document) {
        const uri = this.apiEndPoint + "/update/";
        return this.http.put<boolean>(uri, JSON.stringify(document), this.httpOptions);
    }

    save(document : Document) {
        const uri = this.apiEndPoint + "/save/";
        return this.http.post<boolean>(uri, JSON.stringify(document), this.httpOptions);
    }

    delete(document : Document) {
        const uri = this.apiEndPoint + "/delete/" + document.Id;
        return this.http.delete<boolean>(uri, this.httpOptions);
    }
}