import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from "src/app/service/user.service";

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.scss']
})
export class UsuarioListagemComponent implements OnInit {

  private readonly api = environment.apiEndpoint + "/users";
  displayStyle = "none";
  userId = "";
  error = "";

  users: any[] = [];
  constructor(private userService: UserService, private client: HttpClient) { }

  ngOnInit(): void {

    this.GetUsers();
  }

  GetUsers() {
    this.client.get<any[]>(this.api, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.userService.getToken(),

      })
    }).subscribe(
      (response) => {
        this.users = response;
      },
      (e) => {
        this.error = e.error.message;

      }
    );
  }

  Remove(id: string) {
    let url = this.api + "/" + id;
    this.client.delete(url, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.userService.getToken(),
      })
    }).subscribe(
      (response) => {
        this.GetUsers();
      },
      (e) => {
        this.error = e.error.message;

      }
    );

    this.closePopup();
  }

  openPopup(id: string) {
    this.userId = id;
    this.displayStyle = "block";
  }

  closePopup() {
    this.userId = "";
    this.displayStyle = "none";
  }
  FecharError() {
    this.error = "";
  }

}
