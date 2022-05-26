import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesSweetService {

  constructor() { }

  mensajeOk = (title: string, timer: number = 1500) => Swal.fire({
    position: 'top-end',
    icon: 'success',
    title,
    showConfirmButton: false,
    timer
  });
  mensajeError = (title: string, text: string) => Swal.fire({
    icon: 'error',
    title,
    text
  });
}
