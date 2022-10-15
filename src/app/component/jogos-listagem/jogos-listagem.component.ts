import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-jogos-listagem',
  templateUrl: './jogos-listagem.component.html',
  styleUrls: ['./jogos-listagem.component.scss']
})
export class JogosListagemComponent implements OnInit {
  private readonly api = "http://localhost:3000/games";
  displayStyle = "none";
  fundId = "";

  jogos: any[] = [];

  constructor(private client: HttpClient) { }

  ngOnInit(): void {

    this.GetJogos();
  }

  GetJogos() {
    this.client.get<any[]>(this.api, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      })
    }).subscribe(
      (response) => {
        this.jogos = response;
        console.log(response);
      },
      (e) => {
      }
    );
  }

  Remove(id: string) {
    // let url = this.api + "/" + id;
    // this.client.delete(url, {
    //   headers: new HttpHeaders({
    //     'Accept': 'application/json',
    //   })
    // }).subscribe(
    //   (response) => {
    //     this.GetFunds();
    //   },
    //   (e) => {
    //   }
    // );

    this.closePopup();
  }

  openPopup(id: string) {
    this.fundId = id;
    this.displayStyle = "block";
  }

  closePopup() {
    this.fundId = "";
    this.displayStyle = "none";
  }


}
