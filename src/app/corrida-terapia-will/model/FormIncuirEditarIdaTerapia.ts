import { FormControl } from '@angular/forms';
import { CorridaTerapiaWill } from './CorridaTerapiaWill';

export interface FormIncluirEditarIdaTerapia {
  data: FormControl<string | Date | null>;
  indicadorPodeLevar: FormControl<boolean | null>;
  indicadorPodeTrazer: FormControl<boolean | null>;
  valorCorrida: FormControl<number | null>;
  id: FormControl<number | null>;
  valorTotal: FormControl<number | null>;
  valorVolta: FormControl<number | null>;
}
