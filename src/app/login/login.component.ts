import { NgForm } from '@angular/forms/src/directives';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';


declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

email:string;
  recordarme: boolean = false;
auth2: any;


  constructor(public router: Router,
  public _usuarioService : UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    
  this.email = localStorage.getItem('email') || '';
  if (this.email.length > 1) {
    this.recordarme = true;
  }
  }


  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id : '438583953799-7i3p7vq7l79448a0h5v6e41mtcptdsk9.apps.googleusercontent.com',
        cookiepolicy : 'single_host_origin',
        scope : 'profile email'
      });

this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element){

    this.auth2.attachClickHandler(element,{}, (googleUser) => {
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token).subscribe(() => {
      window.location.href = '#/dashboard';
      });
      
    });
  }

  ingresar(forma:NgForm){
    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null,forma.value.email,forma.value.password);

    this._usuarioService.login(usuario, this.recordarme).subscribe((res:any) => this.router.navigate(['/dashboard']));
    console.log(forma.valid);
    console.log(forma.value);
  }



}
