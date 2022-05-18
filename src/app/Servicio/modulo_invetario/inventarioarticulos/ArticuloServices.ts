import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../../../Model/Matriculas/estudiante';
import { Observable, throwError } from 'rxjs';
import { Articulo } from 'src/app/Model/Inventarios/Articulo';

@Injectable({
    providedIn: 'root'
})
export class Articuloservices {

    private urlPrueba: string = 'http://localhost:9070/articulo';
    constructor(private http: HttpClient) { }

    getArticulos(): Observable<Articulo[]> {
        return this.http.get<Articulo[]>(`${this.urlPrueba}/list`);
    }

}
