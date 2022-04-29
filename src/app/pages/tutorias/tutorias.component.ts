import { Component, OnInit } from '@angular/core';
import { Path } from 'src/app/config';

@Component({
  selector: 'app-tutorias',
  templateUrl: './tutorias.component.html',
  styleUrls: ['./tutorias.component.scss']
})
export class TutoriasComponent implements OnInit {

  constructor() { }
  path:String=Path.url;
  ngOnInit(): void {
  }

}
