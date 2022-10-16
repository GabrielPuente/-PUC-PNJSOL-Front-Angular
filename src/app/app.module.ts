import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ProdutoCadastroComponent } from './component/produto-cadastro/produto-cadastro.component';
import { ProdutoListagemComponent } from './component/produto-listagem/produto-listagem.component';
import { JogosCadastroComponent } from './component/jogos-cadastro/jogos-cadastro.component';
import { JogosListagemComponent } from './component/jogos-listagem/jogos-listagem.component';
import { UsuarioCadastroComponent } from './component/usuario-cadastro/usuario-cadastro.component';
import { UsuarioListagemComponent } from './component/usuario-listagem/usuario-listagem.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProdutoCadastroComponent,
    ProdutoListagemComponent,
    JogosCadastroComponent,
    JogosListagemComponent,
    UsuarioCadastroComponent,
    UsuarioListagemComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
