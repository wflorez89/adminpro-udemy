import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Component, OnInit } from '@angular/core';

declare var swal :any;


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

hospitales: Hospital[]  = [];
desde: number =  0;
total: number = 0;
cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService : ModalUploadService

  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(resp => this.cargarHospitales());

  }

crearHospital(){
          
      swal({
        text: 'Ingrese el nombre del hospital.',
        content: "input",
        button: {
          text: "Guardar",
          closeModal: false,
        },
      })
      .then(name => {
        if (!name) throw null;
        this._hospitalService.crearHospital(name).subscribe(resp => {
          this.cargarHospitales();
        });
      })
      .catch(err => {
        swal.close();

      });

}
  cargarHospitales(){
    this.cargando = true;
        this._hospitalService.cargarHospitales(this.desde).subscribe((resp: any) =>{
          
          this.total = resp.total;
          this.hospitales = resp.hospitales;
          
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
      
      this.cargarHospitales();
  }

  buscarHospitales(termino : string){
      if (termino.length <= 0) {
        this.cargarHospitales();
        return;
      }
      console.log(termino);

      this._hospitalService.buscarHospitaes(termino).subscribe((resp: Hospital[]) =>
      {
        this.hospitales = resp;
        this.cargando = false;
      });
  }

  borrarHospital (hospital : Hospital){
    swal({
      title: 'Eliminar usuaro',
      text: 'Confirma que desea eliminar el usuario?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._hospitalService.borrarhospital(hospital._id).subscribe(resp => {
   
        this.cargarHospitales();
        });
      }
    });
  }

  guardarHospital(hospital: Hospital){
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  mostrarModal(id :string){
     this._modalUploadService.mostrarModal('hospitales', id);
  }

}
