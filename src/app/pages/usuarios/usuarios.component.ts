import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
declare var swal :any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

usuarios: Usuario[]  = [];
desde: number =  0;
total: number = 0;
cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService : ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios(){
    this.cargando = true;
        this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) =>{
          
          this.total = resp.total;
          this.usuarios = resp.usuarios;

          this.cargando = false;
        });
  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;
if (desde >= this.total) {
  return;
}

if (desde < 0) {
  return;
}

this.desde += valor;

this.cargarUsuarios();
  }

  buscarUsuarios(termino : string){
      if (termino.length <= 0) {
        this.cargarUsuarios();
        return;
      }
      console.log(termino);

      this._usuarioService.buscarUsuarios(termino).subscribe((resp: Usuario[]) =>
      {
        this.usuarios = resp;
        this.cargando = false;
      });
  }

  borrarUsuario (usuario : Usuario){
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('no puede borrar usuario','No se puede a si mismo','error');
      return;      
    }

    swal({
      title: 'Eliminar usuaro',
      text: 'Confirma que desea eliminar el usuario?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._usuarioService.borrarusuario(usuario._id).subscribe(resp => {
  
  this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario(usuario: Usuario){
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id :string){
     this._modalUploadService.mostrarModal('usuarios', id);
  }

}
