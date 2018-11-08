import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, scan } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  constructor(
    public http: HttpClient,
    public _usuarioService : UsuarioService
  ) { 
  }
         

  cargarHospitales(desde: number = 0){
      let url = URL_SERVICIOS + '/hospital' ;

     return this.http.get(url);
   }

  obtenerHospital(id : string){
    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url).pipe(
      map((resp : any) => {
              return resp.hospital;
      })
      );
  }

  borrarhospital(id: string){
        let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;
      return this.http.delete(url).pipe(
        map(res => {
          swal('hospital Eliminado','El hospital ha sido eliminado','success');
          return true;
        })
      );
  }

  buscarHospitaes(termino : string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url).pipe(
      map((resp : any) => resp.hospitales)
    );

  }

  crearHospital(nombre: string )
  {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    
    return this.http.post(url, {nombre : nombre})
    .pipe(
      map((resp: any) => {
            swal('Hospital Creado: ', nombre, 'success');
              return resp.hospital;
          })
    );       
  }
                
  actualizarHospital(hospital: Hospital){
      let url = URL_SERVICIOS + '/hospital/' + hospital._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url,hospital).pipe(
        map((resp : any) => {
                  
           swal('Hospital actualizado',hospital.nombre,'success');
           return true; 
          })
      ) ;

  }

}


