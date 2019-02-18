import { Injectable } from '@angular/core';
import { AppSettings } from '../models/appsettings.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserDocument } from '../models/document.model';

@Injectable()
export class DocumentService {
    readonly apiEndPoint : string = AppSettings.API_URL + "/documents/";
    readonly user : string = sessionStorage.getItem('user');
    
    //TODO: remove this variable when API is tied to test or production environment
    readonly apiKey : string = "?key=3d8443e0";

    readonly httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    getAll() {
        //const uri = this.apiEndPoint + "/getall/"+ this.user + this.apiKey;
        const uri = this.apiEndPoint + "/getall/" + this.apiKey;
        return this.http.get<UserDocument[]>(uri, this.httpOptions);
    }

    update(document : UserDocument) {
        const uri = this.apiEndPoint + "/update/";
        return this.http.put<boolean>(uri, JSON.stringify(document), this.httpOptions);
    }

    save(document : UserDocument) {
        const uri = this.apiEndPoint + "/save/";
        return this.http.post<boolean>(uri, JSON.stringify(document), this.httpOptions);
    }

    delete(document : UserDocument) {
        const uri = this.apiEndPoint + "/delete/" + document.Id;
        return this.http.delete<boolean>(uri, this.httpOptions);
    }
}