import { Component, OnInit } from '@angular/core';
import { Malla } from 'src/app/Model/Parametrizacion/Malla';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
import { MallaService } from 'src/app/Servicio/parametrizacion/Service Malla/malla.service';
import { PeriodoService } from 'src/app/Servicio/parametrizacion/Service Periodo/periodo.service';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.scss']
})
export class PeriodoComponent implements OnInit {

  constructor(private servicemalla: MallaService, private serviceperiodo: PeriodoService) { }
  malla: Malla[] = [];
  perdiodoList: Periodo[] = [];
  ngOnInit(): void {
    this.serviceperiodo.getAllPerdiodo().subscribe(data => {
      this.perdiodoList=data;
    })
  }
}
