import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogosCadastroComponent } from './jogos-cadastro.component';

describe('JogosCadastroComponent', () => {
  let component: JogosCadastroComponent;
  let fixture: ComponentFixture<JogosCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogosCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JogosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
