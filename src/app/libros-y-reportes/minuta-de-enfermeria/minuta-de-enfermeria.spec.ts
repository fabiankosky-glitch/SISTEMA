import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutaDeEnfermeria } from './minuta-de-enfermeria';

describe('MinutaDeEnfermeria', () => {
  let component: MinutaDeEnfermeria;
  let fixture: ComponentFixture<MinutaDeEnfermeria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinutaDeEnfermeria],
    }).compileComponents();

    fixture = TestBed.createComponent(MinutaDeEnfermeria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
