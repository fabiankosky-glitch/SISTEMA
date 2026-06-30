import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroDeIngresos } from './libro-de-ingresos';

describe('LibroDeIngresos', () => {
  let component: LibroDeIngresos;
  let fixture: ComponentFixture<LibroDeIngresos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroDeIngresos],
    }).compileComponents();

    fixture = TestBed.createComponent(LibroDeIngresos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
