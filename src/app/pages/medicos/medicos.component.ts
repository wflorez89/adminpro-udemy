import { MedicoService } from '../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/Medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

medicos : Medico[] = [];
  constructor(
    public _medicoService : MedicoService
  ) { 
    
  }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this._medicoService.cargarMedicos()
    .subscribe(medicos => this.medicos = medicos);
  }

  buscarmedico(termino: string){
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarUsuarios(termino)
    .subscribe(medicos => this.medicos = medicos);
  }

  borrarMedico(medico : Medico){
        this._medicoService.borrarMedico(medico._id)
        .subscribe(() => this.cargarMedicos());
  }

}
