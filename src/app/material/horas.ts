export class Horas_Intensivo {
    horas: any[] = [
        { id: 1, inicio: "08:00", fin: "08:40", code: "cl" },
        { id: 2, inicio: "08:40", fin: "09:20", code: "cl" },
        { id: 3, inicio: "09:20", fin: "10:00", code: "cl" },
        { id: 4, inicio: "10:00", fin: "10:40", code: "cl" },
        { id: 5, inicio: "10:40", fin: "11:20", code: "rc" },
        { id: 6, inicio: "11:20", fin: "11:40", code: "cl" },
        { id: 7, inicio: "11:40", fin: "12:20", code: "cl" },
        { id: 8, inicio: "12:20", fin: "12:40", code: "cl" },
        { id: 9, inicio: "12:40", fin: "13:20", code: "cl" },
        { id: 10, inicio: "13:20", fin: "14:00", code: "cl" },
        { id: 11, inicio: "14:00", fin: "14:40", code: "cl" }
    ]
}
export class Horas_NoIntensivo {
    horas: any[] = [
        { id: 1, inicio: "08:00", fin: "08:40", code: "cl" },
        { id: 2, inicio: "08:40", fin: "09:20", code: "cl" },
        { id: 3, inicio: "09:20", fin: "10:00", code: "cl" },
        { id: 4, inicio: "10:00", fin: "10:40", code: "cl" },
        { id: 5, inicio: "10:40", fin: "11:20", code: "rc" },
        { id: 6, inicio: "11:20", fin: "11:40", code: "cl" },
        { id: 7, inicio: "11:40", fin: "12:20", code: "cl" },
        { id: 8, inicio: "12:20", fin: "12:40", code: "cl" },
        { id: 9, inicio: "12:40", fin: "13:20", code: "cl" },
        { id: 10, inicio: "13:20", fin: "14:00", code: "cl" },
        { id: 11, inicio: "14:00", fin: "14:40", code: "cl" }
    ]
}
export let dia = {
    dia: [
        { id: 1, dia: "Sabado" },
        { id: 2, dia: "Domingo" }
    ]
}

export class horarioCompleto {
    id: any;
    hora_inicio: any;
    hora_fin: any;
    materia1: any;
    materia2: any;
}