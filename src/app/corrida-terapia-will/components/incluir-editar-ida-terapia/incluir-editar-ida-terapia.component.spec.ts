import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirEditarIdaTerapiaComponent } from './incluir-editar-ida-terapia.component';

describe('IncluirEditarIdaTerapiaComponent', () => {
  let component: IncluirEditarIdaTerapiaComponent;
  let fixture: ComponentFixture<IncluirEditarIdaTerapiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncluirEditarIdaTerapiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncluirEditarIdaTerapiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
