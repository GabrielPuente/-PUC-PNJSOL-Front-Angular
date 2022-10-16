import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produto } from 'src/app/model/produto';
import { environment } from 'src/environments/environment';
import { UserService } from "src/app/service/user.service";

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.scss']
})
export class ProdutoCadastroComponent implements OnInit {

  private readonly api = environment.apiEndpoint + "/products";
  produto: Produto = new Produto();
  error = "";

  constructor(private userService: UserService,private client: HttpClient, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.InitPage();
  }

  InitPage() {
    let id = this.activeRoute.snapshot.paramMap.get("id")
    if (id && parseInt(id) > 0) {
      this.GetProduct(id)
    }

  }

  GetProduct(id: string) {

    let url = id ? this.api + "/" + id : this.api;

    this.client.get<Produto>(url, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.userService.getToken(),
      })
    }).subscribe((response) => {
      this.produto = response;
    },
      (e) => {
        this.error = e.error.message;
      });

  }

  upSert() {
    if (!this.produto.id) {
      this.Create();
    }
    else {
      this.Update(this.produto.id);
    }
  }

  Create() {
    const model = JSON.parse(JSON.stringify(this.produto));

    this.client.post<Produto>(this.api, model, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.userService.getToken(),
      })
    }).subscribe(
      (response) => {
        window.location.href = '/produtos';
      },
      (e) => {
        this.error = e.error.message;
      });

  }

  Update(id: number) {

    const model = JSON.parse(JSON.stringify(this.produto));
    let url = id ? this.api + "/" + id : this.api;

    this.client.put(url, model, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.userService.getToken(),
      })
    }).subscribe(
      (response) => {
        window.location.href = '/produtos';
      },
      (e) => {
        this.error = e.error.message;
      });
  }

  FecharError() {
    this.error = "";
  }

}
