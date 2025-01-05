import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaTerapiaWillComponent } from './corrida-terapia-will.component';

describe('CorridaTerapiaWillComponent', () => {
  let component: CorridaTerapiaWillComponent;
  let fixture: ComponentFixture<CorridaTerapiaWillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorridaTerapiaWillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorridaTerapiaWillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
