import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarContaCorrenteComponent } from './listar-conta-corrente.component';

describe('ListarContaCorrenteComponent', () => {
  let component: ListarContaCorrenteComponent;
  let fixture: ComponentFixture<ListarContaCorrenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarContaCorrenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarContaCorrenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
