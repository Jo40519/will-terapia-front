import { FormControl } from "@angular/forms";

export interface CorridaTerapiaWill {
    id?: number;
    valorCorrida: number;
    valorVolta: number;
    valorTotal: number;
    dataidavolta: string | Date;
    indicadorPodeLevar: boolean;
    indicadorPodeTrazer: boolean;
}