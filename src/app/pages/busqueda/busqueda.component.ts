import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { URL_SERVICIOS } from '../../config/config';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

usuarios : Usuario[] = [];
medicos: Medico[] = [];
hospitales: Hospital[] = [];

  constructor(
public activatedRoute: ActivatedRoute,
public http : HttpClient

  ) { 

    activatedRoute.params.subscribe(
      params => {
        let termino = params['termino'];
        this.buscar(termino);
      }
    );
  }

  ngOnInit() {
  }

  buscar(termino: string){
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
     this.http.get(url).subscribe((resp : any) => 
     {
         this.usuarios = resp.usuarios;
         this.medicos = resp.medicos;
         this.hospitales = resp.hospitales;
     }); 
  }

}
