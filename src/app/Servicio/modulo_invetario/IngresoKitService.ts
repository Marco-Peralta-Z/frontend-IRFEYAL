import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Ingresokit } from 'src/app/Model/Inventarios/Ingresokit';

@Injectable({
    providedIn: 'root'
})
export class IngresokitService {

    private urlPrueba: string = 'http://localhost:9070/articulo';
    constructor(private http: HttpClient) { }

    getArticulos(): Observable<Ingresokit[]> {
        return this.http.get<Ingresokit[]>(`${this.urlPrueba}/list`);
    }

}