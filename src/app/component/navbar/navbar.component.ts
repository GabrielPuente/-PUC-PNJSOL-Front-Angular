import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor() { }

  ngOnInit(): void {
    this.CheckUser();
  }

  Logout() {
    localStorage.removeItem("user");
    this.CheckUser();
    this.usuario = new Usuario();
    console.log(this.usuario);
  }

  CheckUser() {
    setTimeout(() => {
      const savedUser = localStorage.getItem('user');
      this.usuario = savedUser ? JSON.parse(savedUser) : null;

      if (!savedUser) {
        this.CheckUser();
      }
    }, 1000);
  }
}
