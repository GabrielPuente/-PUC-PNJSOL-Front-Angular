import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from "src/app/service/user.service";

@Component({
  selector: 'app-jogos-listagem',
  templateUrl: './jogos-listagem.component.html',
  styleUrls: ['./jogos-listagem.component.scss']
})
export class JogosListagemComponent implements OnInit {
  private readonly api = environment.apiEndpoint + "/games";
  displayStyle = "none";
  gameId = "";
  games: any[] = [];
  error = "";

  constructor(private userService: UserService, private client: HttpClient) { }

  ngOnInit(): void {
    this.GetGames();
  }

  GetGames() {
    this.client.get<any[]>(this.api, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.userService.getToken(),
      })
    }).subscribe(
      (response) => {
        this.games = response;
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
        this.GetGames();
      },
      (e) => {
        this.error = e.error.message;
      });

    this.closePopup();
  }

  openPopup(id: string) {
    this.gameId = id;
    this.displayStyle = "block";
  }

  closePopup() {
    this.gameId = "";
    this.displayStyle = "none";
  }

  FecharError() {
    this.error = "";
  }
}
