import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Login } from 'src/app/model/login';
import { Usuario } from 'src/app/model/usuario';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly api = environment.apiEndpoint + "/users/login";

  login: Login = new Login();
  usuario: Usuario = new Usuario();
  error = "";

  constructor(private client: HttpClient) { }

  ngOnInit(): void {
  }

  Logar() {
    console.log(this.api);

    const model = JSON.parse(JSON.stringify(this.login));
    this.client.post<Login>(this.api, model, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      })
    }).subscribe(
      (response) => {
        this.usuario = response;
        localStorage.setItem("user", JSON.stringify(this.usuario));

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
