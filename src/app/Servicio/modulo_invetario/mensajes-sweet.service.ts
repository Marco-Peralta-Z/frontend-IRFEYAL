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
  mensajeInfo = (title: string, text: string) => Swal.fire({
    icon: 'info',
    title,
    text
  });

  showLoading = (close: boolean, title: string, text: string) => {
    Swal.fire({
        title ,
        text,
        width: 600,
        padding: '3em',
        color: '#716add',
        allowOutsideClick: close,
        showConfirmButton: false,
        backdrop: `
          rgba(0,0,126,0.5)
          left top
          no-repeat
        `,
        didOpen: () => {
            Swal.showLoading()
        }
      })
  }
}
