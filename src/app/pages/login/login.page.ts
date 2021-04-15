import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser = {
    usuario: '',
    password: '',
    company: ''
  };

  constructor() { }

  ngOnInit() {
  }

  login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    // this.authService.login(this.loginUser.usuario, this.loginUser.password, this.loginUser.company)
  }


}
