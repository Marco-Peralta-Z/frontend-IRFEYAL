/*

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Aprobacion } from 'src/app/Model/Inventarios/Aprobacion';

@Injectable({
    providedIn: 'root'
})
export class AprobacionService {

    private urlPrueba: string = 'http://localhost:9070/aprobacion';
    constructor(private http: HttpClient) { }

    getAprobaciones(): Observable<Aprobacion[]> {
        return this.http.get<Aprobacion[]>(`${this.urlPrueba}/list`);
    }

}

*/