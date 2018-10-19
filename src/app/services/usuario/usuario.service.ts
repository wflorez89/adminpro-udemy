import { URL_SERVICIOS } from '../../config/config';
import * as url from 'url';

import { Usuario } from '../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs' ;
import { map, filter, scan } from 'rxjs/operators';
import { LoginComponent } from '../../login/login.component';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

usuario: Usuario;
token: string = '';

  constructor(
    public http: HttpClient,
    public router : Router,
    public _subirArchivoService : SubirArchivoService
  ) { 
  this.cargarStorage();
    
  }

  estaLogueado(){
    return (this.token.length > 5)  ? true : false;
  }

cargarStorage()
{
  if (localStorage.getItem('token')) {
    this.token = localStorage.getItem('token');
    this.usuario =  JSON.parse( localStorage.getItem('usuario'));
  }else{
    this.token  = '';
    this.usuario =  null;
  }
}

guardarStorage(id:string, token: string, usuario: Usuario){
            localStorage.setItem('id',id);
            localStorage.setItem('token',token);
            localStorage.setItem('usuario',JSON.stringify(usuario) );

            this.usuario = usuario;
            this.token = token;

}


logout(){
  this.usuario = null;
  this.token = '';

  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

this.router.navigate(['/login']);
}

  loginGoogle(token: string){
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token:token}).pipe(
      map((resp: any) => {
this.guardarStorage(resp.id, resp.token, resp.usuario);

return true;
          }));
  }



login(usuario: Usuario, recordarme: boolean){
  if (recordarme) {
    localStorage.setItem('email', usuario.email);
  }else{
    localStorage.removeItem('email');
  }


let url = URL_SERVICIOS + '/login';
return this.http.post(url, usuario).pipe(
      map((resp: any) => {
this.guardarStorage(resp.id, resp.token, resp.usuario);
return true;
          }));

}
  crearUsuario(usuario: Usuario)
  {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
    .pipe(
      map((resp: any) => {
            swal('Usuario Creado', usuario.email, 'success');
              return resp.usuario;
          })
    );
          
  }

  actualizarUsuario(usuario: Usuario){
      let url = URL_SERVICIOS + '/usuario/' + usuario._id;
      url += '?token=' + this.token;
return this.http.put(url,usuario).pipe(
  map((resp : any) => {
 

     if (usuario._id === this.usuario._id) {
         let usuariodb: Usuario = resp.usuario;
         this.guardarStorage(usuariodb._id, this.token, usuariodb);   
     }

 swal('usuario actualizado',usuario.nombre,'success');

 return true; 
})
) ;

  }


  cambiarImagen(file: File, id: string){
       this._subirArchivoService.subirArchivo(file,'usuarios',id)
       .then((resp: any) => {
         console.log(resp);
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre,'success');
        this.guardarStorage(id, this.token, this.usuario)  ;
           }).catch(resp => {
         console.log(resp);
       });
  }

  cargarUsuarios(desde: number = 0){
     let url = URL_SERVICIOS + '/usuario?desde=' + desde;

     return this.http.get(url);
  }

  buscarUsuarios(termino : string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url).pipe(
      map((resp : any) => resp.usuarios)
    );

  }

  borrarusuario(id: string){
    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete(url).pipe(
      map(res => {
        swal('usuario Eliminado','El ususario ha sido eliminado','success');
        return true;
      })
    );
  }
}
