import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Curso } from 'src/app/Model/Parametrizacion/Curso';
import { tutor } from 'src/app/Model/Parametrizacion/tutor';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }
  private url = Api.url + "curso";

  getAllCursos() {
    return this.http.get<any[]>(this.url);
  }

  getIdCursos(id_curso: any) {
    return this.http.get<Curso>(this.url + "/" + id_curso);
  }

  postCurso(curso: Curso) {
    return this.http.post<Curso>(this.url, curso);
  }

  putCurso(curso: Curso) {
    return this.http.put<Curso>(this.url + "/" + curso.id_curso, curso);
  }

  deleteCurso(curso: Curso) {
    return this.http.delete<any>(this.url + "/" + curso.id_curso);
  }

  //Tutor

  getAllTutor() {
    return this.http.get<tutor[]>(Api.url + "tutor");
  }

  postTutor(tutor: tutor) {
    return this.http.post<tutor>(Api.url + "tutor", tutor);
  }

  deleteTutor(t: tutor) {
    return this.http.delete<any>(Api.url + "tutor" + "/" + t.id_tutor);
  }
}
