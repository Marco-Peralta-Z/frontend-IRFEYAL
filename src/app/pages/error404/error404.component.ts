import { Component, OnInit } from '@angular/core';

import { Path } from '../../config';
@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  constructor() { }
  path:String=Path.url;
  ngOnInit(): void {
  }

}
