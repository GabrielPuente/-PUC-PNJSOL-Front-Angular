import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogosListagemComponent } from './jogos-listagem.component';

describe('JogosListagemComponent', () => {
  let component: JogosListagemComponent;
  let fixture: ComponentFixture<JogosListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogosListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JogosListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
