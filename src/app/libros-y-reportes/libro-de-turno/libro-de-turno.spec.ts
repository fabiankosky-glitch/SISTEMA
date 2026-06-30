import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroDeTurno } from './libro-de-turno';

describe('LibroDeTurno', () => {
  let component: LibroDeTurno;
  let fixture: ComponentFixture<LibroDeTurno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroDeTurno],
    }).compileComponents();

    fixture = TestBed.createComponent(LibroDeTurno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
