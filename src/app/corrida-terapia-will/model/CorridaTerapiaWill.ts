import { FormControl } from "@angular/forms";

export interface CorridaTerapiaWill {
    id?: number;
    valorCorrida: number;
    valorVolta: number;
    valorTotal: number;
    dataidavolta: string;
    indicadorPodeLevar: boolean;
    indicadorPodeTrazer: boolean;
    descricao: string;
}