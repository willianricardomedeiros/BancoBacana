import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibirContaCorrenteComponent } from './exibir-conta-corrente.component';

describe('ExibirContaCorrenteComponent', () => {
  let component: ExibirContaCorrenteComponent;
  let fixture: ComponentFixture<ExibirContaCorrenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExibirContaCorrenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibirContaCorrenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
