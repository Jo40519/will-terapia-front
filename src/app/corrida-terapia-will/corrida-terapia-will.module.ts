import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CorridaTerapiaWillRoutingModule } from './corrida-terapia-will-routing.module';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CorridaTerapiaWillComponent } from './corrida-terapia-will.component';
import { ListaCorridasTerapiaComponent } from './components/lista-corridas-terapia/lista-corridas-terapia.component';
import { HttpClientModule } from '@angular/common/http';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { FiltroPesquisaComponent } from './components/filtro-pesquisa/filtro-pesquisa.component';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { IncluirEditarIdaTerapiaComponent } from './components/incluir-editar-ida-terapia/incluir-editar-ida-terapia.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificaService } from './service/notifica.service';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { CorridaTerapiaWillService } from './service/corrida-terapia-will.service';
import { MessagingService } from './service/messaging.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { CheckboxModule } from 'primeng/checkbox';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    CorridaTerapiaWillComponent,
    ListaCorridasTerapiaComponent,
    FiltroPesquisaComponent,
    IncluirEditarIdaTerapiaComponent,
  ],
  imports: [
    CommonModule,
    CorridaTerapiaWillRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CardModule,
    TableModule,
    TagModule,
    AccordionModule,
    CalendarModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    MessagesModule,
    ToastModule,
    CheckboxModule,
    SkeletonModule,
    InputTextareaModule,
  ],
  providers: [
    DatePipe,
    NotificaService,
    MessageService,
    CorridaTerapiaWillService,
    MessagingService,
    AngularFireMessaging,
  ],
})
export class CorridaTerapiaWillModule {}
