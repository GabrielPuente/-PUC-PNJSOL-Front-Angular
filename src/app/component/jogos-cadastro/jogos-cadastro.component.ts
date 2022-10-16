import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Jogo } from 'src/app/model/jogo';
import { environment } from 'src/environments/environment';
import { UserService } from "src/app/service/user.service";

@Component({
  selector: 'app-jogos-cadastro',
  templateUrl: './jogos-cadastro.component.html',
  styleUrls: ['./jogos-cadastro.component.scss']
})
export class JogosCadastroComponent implements OnInit {

  private readonly api = environment.apiEndpoint + "/games";
  jogo: Jogo = new Jogo();
  error = "";

  constructor(private userService: UserService, private client: HttpClient, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.InitPage();
  }

  InitPage() {
    let id = this.activeRoute.snapshot.paramMap.get("id")
    if (id && parseInt(id) > 0) {
      this.GetGame(id)
    }
  }

  GetGame(id: string) {

    let url = id ? this.api + "/" + id : this.api;
    this.client.get<Jogo>(url, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.userService.getToken(),
      })
    }).subscribe((response) => {
      this.jogo = response;
    },
      (e) => {
        this.error = e.error.message;
      });

  }

  upSert() {
    if (!this.jogo.id) {
      this.Create();
    }
    else {
      this.Update(this.jogo.id);
    }
  }

  Create() {
    const model = JSON.parse(JSON.stringify(this.jogo));

    this.client.post<Jogo>(this.api, model, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.userService.getToken(),
      })
    }).subscribe(
      (response) => {
        window.location.href = '/jogos';
      },
      (e) => {
        this.error = e.error.message;
      });

  }

  Update(id: number) {

    const model = JSON.parse(JSON.stringify(this.jogo));
    let url = id ? this.api + "/" + id : this.api;

    this.client.put(url, model, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.userService.getToken(),
      })
    }).subscribe(
      (response) => {
        window.location.href = '/jogos';
      },
      (e) => {
        this.error = e.error.message;
      });
  }

  FecharError() {
    this.error = "";
  }
}
