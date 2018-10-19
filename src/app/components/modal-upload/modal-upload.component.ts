import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

imagenSubir: File;
imagenTemp : string;

  constructor(
    public _cargaarhivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService,
  ) { }

  ngOnInit() {
  }

  cerrarModal()
  {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

seleccionImage(archivo: File)
    {
      if (!archivo) {
        return;
      }

      if (archivo.type.indexOf('image') < 0) {
        swal('Solo archivos de imagen','El archivo seleccionado no es una imagen','error');
        this.imagenSubir = null;
        return;
      }


      this.imagenSubir = archivo;

      let reader = new FileReader();
      let urlimagenTemp = reader.readAsDataURL(archivo);
     

     reader.onloadend = () => this.imagenTemp = reader.result;

    }

    subirImagen(){
      this._cargaarhivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo,this._modalUploadService.id)
      .then(resp => {

        this._modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      } ).catch(err => {

        console.log('error en la carga');
      });
    }


}
