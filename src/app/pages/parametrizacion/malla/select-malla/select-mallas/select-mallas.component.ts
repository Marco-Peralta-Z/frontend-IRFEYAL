import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Malla } from 'src/app/Model/Parametrizacion/Malla';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
import { MallaService } from 'src/app/Servicio/parametrizacion/Service Malla/malla.service';
import { AsignaturaPeriodoComponent } from '../../../asignaturas/asignatura_periodo/asignatura-periodo/asignatura-periodo.component';
import { MallaCursoComponent } from '../../../cursos/malla_curso/malla-curso/malla-curso.component';

@Component({
  selector: 'app-select-mallas',
  templateUrl: './select-mallas.component.html',
  styleUrls: ['./select-mallas.component.css']
})
export class SelectMallasComponent implements OnInit {

  constructor(
    private servicemalla: MallaService,
    public dialogService: DialogService,
    public ref2: DynamicDialogRef,
    public config: DynamicDialogConfig) { }

  malla: Malla[] = [];
  selecperiodo!: Periodo;
  ref!: DynamicDialogRef;
  ngOnInit(): void {
    this.servicemalla.getAllMalla().subscribe(data => {
      data.forEach(element => {
        if (element.estado) {
          this.malla.push(element);
        }
      });
    })

  }

  verAsignaturas(selectmalla: Malla) {
    localStorage.setItem("id_malla", selectmalla.id_malla.toString())
    this.ref = this.dialogService.open(AsignaturaPeriodoComponent, {
      header: 'Listado de Asignaturas',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
  }

  verCursos(selectmalla: Malla) {
    localStorage.setItem("id_malla", selectmalla.id_malla.toString())
    this.ref = this.dialogService.open(MallaCursoComponent, {
      header: 'Listado de Asignaturas',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

  }

  selectMalla(mall: Malla) {
    this.ref2.close(mall);
  }

}
