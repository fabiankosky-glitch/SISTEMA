import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroCorrecto } from './libro-correcto';

describe('LibroCorrecto', () => {
  let component: LibroCorrecto;
  let fixture: ComponentFixture<LibroCorrecto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroCorrecto],
    }).compileComponents();

    fixture = TestBed.createComponent(LibroCorrecto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
