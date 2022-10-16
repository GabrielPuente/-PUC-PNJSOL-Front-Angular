import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/model/usuario';
import { environment } from 'src/environments/environment';
import { UserService } from "src/app/service/user.service";

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss']
})
export class UsuarioCadastroComponent implements OnInit {

  private readonly api = environment.apiEndpoint + "/users";
  usuario: Usuario = new Usuario();
  error = "";

  constructor(private userService: UserService, private client: HttpClient, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.InitPage();
  }

  InitPage() {
    let id = this.activeRoute.snapshot.paramMap.get("id")
    if (id && parseInt(id) > 0) {
      this.GetUser(id)
    }

  }

  GetUser(id: string) {

    let url = id ? this.api + "/" + id : this.api;

    this.client.get<Usuario>(url, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.userService.getToken(),
      })
    }).subscribe((response) => {
      this.usuario = response;
    },
      (e) => {
        this.error = e.error.message;
      });

  }

  upSert() {
    if (!this.usuario.id) {
      this.Create();
    }
    else {
      this.Update(this.usuario.id);
    }
  }

  Create() {
    const model = JSON.parse(JSON.stringify(this.usuario));

    this.client.post<Usuario>(this.api, model, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.userService.getToken(),
      })
    }).subscribe(
      (response) => {
        window.location.href = '/usuarios';
      },
      (e) => {
        this.error = e.error.message;
      });

  }

  Update(id: number) {

    const model = JSON.parse(JSON.stringify(this.usuario));
    let url = id ? this.api + "/" + id : this.api;

    this.client.put(url, model, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.userService.getToken(),
      })
    }).subscribe(
      (response) => {
        window.location.href = '/usuarios';
      },
      (e) => {
        this.error = e.error.message;
      });
  }

  FecharError() {
    this.error = "";
  }

}
