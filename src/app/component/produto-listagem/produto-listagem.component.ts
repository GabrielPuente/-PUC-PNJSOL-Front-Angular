import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from "src/app/service/user.service";

@Component({
  selector: 'app-produto-listagem',
  templateUrl: './produto-listagem.component.html',
  styleUrls: ['./produto-listagem.component.scss']
})
export class ProdutoListagemComponent implements OnInit {
  private readonly api = environment.apiEndpoint + "/products";
  displayStyle = "none";
  productId = "";
  error = "";

  products: any[] = [];
  constructor(private userService: UserService,private client: HttpClient) { }

  ngOnInit(): void {

    this.GetProducts();
  }

  GetProducts() {
    this.client.get<any[]>(this.api, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.userService.getToken(),
      })
    }).subscribe(
      (response) => {
        this.products = response;
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
        this.GetProducts();
      },
      (e) => {
        this.error = e.error.message;
      }
    );

    this.closePopup();
  }

  openPopup(id: string) {
    this.productId = id;
    this.displayStyle = "block";
  }

  closePopup() {
    this.productId = "";
    this.displayStyle = "none";
  }

  FecharError() {
    this.error = "";
  }
}
