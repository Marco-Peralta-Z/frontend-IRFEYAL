import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
  })
export class ValidatorsService {

  constructor() { }
  // variables de metodo para validar la cedula
  tama: number = 0;
  error?: boolean;
  fin?: number;
  resta?: number;
  mostrar?: string;
  num?: number;

  multi?: number;
  expo?: number;
  mod?: number;
  suma?: number;
  num1?: number;
  p?: number;
  // Array de valores de caracteres

valores=[
  {
    caracter: '<',
    valor: 0
  },
  {
    caracter: 'A',
    valor: 10
  },
  {
    caracter: 'B',
    valor: 11
  },
  {
    caracter: 'C',
    valor: 12
  },
  {
    caracter: 'D',
    valor: 13
  },
  {
    caracter: 'E',
    valor: 14
  },
  {
    caracter: 'F',
    valor: 15
  },
  {
    caracter: 'G',
    valor: 16
  },
  {
    caracter: 'H',
    valor: 17
  },
  {
    caracter: 'I',
    valor: 18
  },
  {
    caracter: 'J',
    valor: 19
  },
  {
    caracter: 'K',
    valor: 20
  },
  {
    caracter: 'L',
    valor: 21
  },
  {
    caracter: 'M',
    valor: 22
  },
  {
    caracter: 'N',
    valor: 23
  },
  {
    caracter: 'O',
    valor: 24
  },
  {
    caracter: 'P',
    valor: 25
  },
  {
    caracter: 'Q',
    valor: 26
  },
  {
    caracter: 'R',
    valor: 27
  },
  {
    caracter: 'S',
    valor: 28
  },
  {
    caracter: 'T',
    valor: 29
  },
  {
    caracter: 'U',
    valor: 30
  },
  {
    caracter: 'V',
    valor: 31
  },
  {
    caracter: 'W',
    valor: 32
  },
  {
    caracter: 'X',
    valor: 33
  },
  {
    caracter: 'Y',
    valor: 34
  },
  {
    caracter: 'Z',
    valor: 35
  }
];
multiplos=[
  {
    valor: 0,
    weight:7
  },
  {
    valor:0,
    weight:3
  },
  {
    valor:0,
    weight:1
  },
  {
    valor: 0,
    weight:7
  },
  {
    valor:0,
    weight:3
  },
  {
    valor:0,
    weight:1
  }, {
    valor: 0,
    weight:7
  },
  {
    valor:0,
    weight:3
  },
  {
    valor:0,
    weight:1
  }
];
octavo=[
  {
    nombre:'Copia de cédula',
  },
  {
    nombre:'Certificado de terminación de primaria o Certificado de promoción de 7mo legalizado'
  }
];
noveno=[
  {
    nombre:'Copia de cédula',
  },
  {
    nombre:'Certificado de terminación de primaria o Certificado de promoción de 7mo legalizado'
  },
  {
    nombre:'Certificado de matrícula de 8vo'
  },
  {
    nombre:'Certificado de promoción de 8vo legalizado'
  }
];
decimo=[
  {
    nombre:'Copia de cédula',
  },
  {
    nombre:'Certificado de terminación de primaria o Certificado de promoción de 7mo legalizado'
  },
  {
    nombre:'Certificado de matrícula de 8vo'
  },
  {
    nombre:'Certificado de promoción de 8vo legalizado'
  },
  {
    nombre:'Certificado de matrícula de 9vo'
  },
  {
    nombre:'Certificado de promoción de 9vo legalizado'
  }
];
primero=[
  {
    nombre:'Copia de cédula',
  },
  {
    nombre:'Certificado de terminación de primaria o Certificado de promoción de 7mo legalizado'
  },
  {
    nombre:'Certificado de matrícula de 8vo'
  },
  {
    nombre:'Certificado de promoción de 8vo legalizado'
  },
  {
    nombre:'Certificado de matrícula de 9vo'
  },
  {
    nombre:'Certificado de promoción de 9vo legalizado'
  },
  {
    nombre:'Certificado de matrícula de 10vo'
  },
  {
    nombre:'Certificado de promoción de 10vo legalizado'
  }
];
segundo=[
  {
    nombre:'Copia de cédula',
  },
  {
    nombre:'Certificado de terminación de primaria o Certificado de promoción de 7mo legalizado'
  },
  {
    nombre:'Certificado de matrícula de 8vo'
  },
  {
    nombre:'Certificado de promoción de 8vo legalizado'
  },
  {
    nombre:'Certificado de matrícula de 9vo'
  },
  {
    nombre:'Certificado de promoción de 9vo legalizado'
  },
  {
    nombre:'Certificado de matrícula de 10vo'
  },
  {
    nombre:'Certificado de promoción de 10vo legalizado'
  },
  {
    nombre:'Certificado de matrícula de 1ro de bachilleraro'
  },
  {
    nombre:'Certificado de promoción de 1ro de bachillerato legalizado'
  },
  {
    nombre:'Certificado de 120 horas de participación estudiantil(primero de bachillerato)'
  }
];
tercero=[
  {
    nombre:'Copia de cédula',
  },
  {
    nombre:'Certificado de terminación de primaria o Certificado de promoción de 7mo legalizado'
  },
  {
    nombre:'Certificado de matrícula de 8vo'
  },
  {
    nombre:'Certificado de promoción de 8vo legalizado'
  },
  {
    nombre:'Certificado de matrícula de 9vo'
  },
  {
    nombre:'Certificado de promoción de 9vo legalizado'
  },
  {
    nombre:'Certificado de matrícula de 10vo'
  },
  {
    nombre:'Certificado de promoción de 10vo legalizado'
  },
  {
    nombre:'Certificado de matrícula de 1ro de bachilleraro'
  },
  {
    nombre:'Certificado de promoción de 1ro de bachillerato legalizado'
  },
  {
    nombre:'Certificado de matrícula de 2ro de bachilleraro'
  },
  {
    nombre:'Certificado de promoción de 2ro de bachillerato legalizado'
  },
  {
    nombre:'Certificado de 120 horas de participación estudiantil(primero de bachillerato)'
  },
  {
    nombre:'Certificado de 80 horas de participación estudiantil (segundo de bachillerato).'
  }
];
//Array con requerimientos por cursos
requerimientos=[
  // Inicio para no intensivo
  {
    curso:'octavo',
    modalidad:'no intensivo',
    Listrequisitos:this.octavo
  },
  {
    curso:'noveno',
    modalidad:'no intensivo',
    Listrequisitos:this.noveno
  },
  {
    curso:'décimo',
    modalidad:'no intensivo',
    Listrequisitos:this.decimo
  },
  {
    curso:'primero de bachillerato',
    modalidad:'no intensivo',
    Listrequisitos:this.primero
  },
  {
    curso:'segundo de bachillerato',
    modalidad:'no intensivo',
    Listrequisitos:this.segundo
  },
  {
    curso:'tercero de bachillerato',
    modalidad:'no intensivo',
    Listrequisitos:this.tercero
  },
  // Fin de no intensivo
  // Inicio de requerimientos para intensivo
  {
    curso:'octavo',
    modalidad:'intensivo',
    Listrequisitos:this.octavo
  },
  {
    curso:'basica superior intensiva',
    modalidad:'intensivo',
    Listrequisitos:this.octavo
  },
  {
    curso:'básica superior',
    modalidad:'intensivo',
    Listrequisitos:this.octavo
  },
  {
    curso:'básica superior intensiva',
    modalidad:'intensivo',
    Listrequisitos:this.octavo
  },
  {
    curso:'noveno',
    modalidad:'intensivo',
    Listrequisitos:this.noveno
  },
  {
    curso:'décimo',
    modalidad:'intensivo',
    Listrequisitos:this.decimo
  },
  {
    curso:'primero de bachillerato',
    modalidad:'intensivo',
    Listrequisitos:this.primero
  },
  {
    curso:'segundo de bachillerato',
    modalidad:'intensivo',
    Listrequisitos:this.segundo
  },
  {
    curso:'tercero de bachillerato',
    modalidad:'intensivo',
    Listrequisitos:this.tercero
  }
];

patters=[{
  expresion:/^[A-Z]{1}\d{7}$/
},
{
  expresion:/^[0-9]{9}$/
},
{
  expresion:/^[A-Z]{3}\d{6}$/
}
]

  validarCedu(cedu: string): boolean {
    this.tama = cedu.length;
    this.error = true;
    this.resta = 0;
    this.fin = 1;
    if (this.tama == 10) {
      this.mostrar = "";

      for (let i = 0; i < cedu.length; i++) {
        const letra = cedu.charAt(i);
        this.num = Number(letra);
        this.fin = this.num;
      }
    } else {
      this.error = false;

    }
    if (this.error) {
      this.multi = 0;
      this.expo = 0;
      this.suma = 0;

      for (let i = 0; i < cedu.length - 1; i++) {
        const letra = cedu.charAt(i);
        this.num1 = Number(letra);
        if (this.expo == i) {
          this.multi = this.num1 * 2;
          this.expo = this.expo + 2;
          if (this.multi >= 10) {
            this.multi = this.multi - 9;
          }
        } else {
          this.multi = this.num1;
        }
        this.suma = this.suma + this.multi;
      }

      this.p = 0;

      for (let j = 0; j <= 100; j++) {
        if (this.p > this.suma || this.p == this.suma) {
          this.resta = this.p - this.suma;
          j = 1000;
        } else {
          this.p = j * 10;
        }

      }
      if (this.error) {
        if (this.resta == this.fin) {
  
          this.error = true;
  
        } else {
         
          this.error = false;
        }
      }
    } else {
     
      this.error = false;
    }
    
    return this.error;
  }

  validarPorPasaporte(passport: string): boolean{
    this.error = true;
    for (let i = 0; i < passport.length; i++) {
      if (i==passport.length-1) {
        const letra = passport.charAt(i);
        if (this.num = Number(letra)) {
          this.fin = this.num;
        }else{
          return this.error=false;
        }        
      } 
    }
    console.log(passport);
    // para llenar el array multiplos
    for (let p = 0; p < passport.length; p++) {
      
      const elemento = passport.charAt(p);
      if (Number(elemento)) {
        this.multiplos[p].valor=Number(elemento);
      }else{
        for (let v = 0; v < this.valores.length; v++) {
          if (elemento.toUpperCase() === this.valores[v].caracter) {
              this.multiplos[p].valor=this.valores[v].valor;
              console.log(elemento, '  ', this.multiplos[p].valor);
              break;
          }   
       }
      }  
    }  
    this.suma=0;
    console.log(this.multiplos);
    for (let m = 0; m < this.multiplos.length; m++) {
            this.multi=this.multiplos[m].valor * this.multiplos[m].weight;
            this.suma=this.multi + this.suma;
    }

    this.mod= this.suma % 10;
    console.log(this.suma, ' ', this.mod);
    
    if (this.mod == this.fin) {
      this.error=true;
    }else{
      this.error=false;
    }
    return this.error;
  }


  esAlfanumerico(valor: string){
      for (let i = 0; i < this.patters.length; i++) {
        let patron = this.patters[i].expresion;
        if (patron.test(valor.toUpperCase())) {
          return true;
        }
        
      }
      return false;
  }
}
