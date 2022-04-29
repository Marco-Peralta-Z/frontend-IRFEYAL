import { Component, OnInit } from '@angular/core';
import { provincia } from '../../../../Model/rolesTS/provincia';
import { EstudianteService } from '../../../../Servicio/moduloMatricula/estudianteServices/estudiante.service';

@Component({
  selector: 'app-agregar-estudiante',
  templateUrl: './agregar-estudiante.component.html',
  styleUrls: ['./agregar-estudiante.component.scss']
})
export class AgregarEstudianteComponent implements OnInit {
  selectedProvincia:  provincia[]=[];
  filteredProvincia: provincia[]=[];
  provincias: provincia[]=[];
  activeIndex1: number = 0;
  constructor(private estudianteService: EstudianteService) { }

  ngOnInit(): void {

    this.estudianteService.getProvincias()
    .subscribe(provincia => this.provincias=provincia);
  }

  
  filterCountry(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.provincias.length; i++) {
        let provincia = this.provincias[i];
        if (provincia.provincia.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(provincia);
        }
    }

    this.filteredProvincia = filtered;
    
}
mostrar(){
  console.log(this.selectedProvincia);
}
}
