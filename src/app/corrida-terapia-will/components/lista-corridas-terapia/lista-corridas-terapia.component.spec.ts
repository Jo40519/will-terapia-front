import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCorridasTerapiaComponent } from './lista-corridas-terapia.component';

describe('ListaCorridasTerapiaComponent', () => {
  let component: ListaCorridasTerapiaComponent;
  let fixture: ComponentFixture<ListaCorridasTerapiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCorridasTerapiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaCorridasTerapiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
