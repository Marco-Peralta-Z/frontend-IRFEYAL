import { Component, OnInit } from '@angular/core';
import { Malla } from 'src/app/Model/Parametrizacion/Malla';
import { MallaService } from 'src/app/Servicio/parametrizacion/Service Malla/malla.service';

@Component({
  selector: 'app-malla',
  templateUrl: './malla.component.html',
  styleUrls: ['./malla.component.scss'],
  styles: [`
      :host ::ng-deep .p-dialog .product-image {
          width: 150px;
          margin: 0 auto 2rem auto;
          display: block;
      }
  `],
})
export class MallaComponent implements OnInit {

  constructor(private servicemalla: MallaService) { }
  malla: Malla[] = [];
  ngOnInit(): void {
    this.servicemalla.getAllMalla().subscribe(data => {
      this.malla = data;
    })
  }

}
