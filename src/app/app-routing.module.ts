import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { UsuarioCadastroComponent } from './component/usuario-cadastro/usuario-cadastro.component';
import { UsuarioListagemComponent } from './component/usuario-listagem/usuario-listagem.component';
import { ProdutoCadastroComponent } from './component/produto-cadastro/produto-cadastro.component';
import { ProdutoListagemComponent } from './component/produto-listagem/produto-listagem.component';
import { JogosCadastroComponent } from './component/jogos-cadastro/jogos-cadastro.component';
import { JogosListagemComponent } from './component/jogos-listagem/jogos-listagem.component';

const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'usuario/:id', component: UsuarioCadastroComponent },
  { path: 'usuarios', component: UsuarioListagemComponent },
  
  { path: 'produto/:id', component: ProdutoCadastroComponent },
  { path: 'produtos', component: ProdutoListagemComponent },

  { path: 'jogo/:id', component: JogosCadastroComponent },
  { path: 'jogos', component: JogosListagemComponent },
  
  { path: '**', pathMatch: 'full', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
