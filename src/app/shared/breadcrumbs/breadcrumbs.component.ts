import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router ,ActivationEnd } from '@angular/router';
import { map, filter } from 'rxjs/internal/operators';
import { MetaDefinition } from "@angular/platform-browser";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

 titulo: string;
  constructor(private router: Router,
  private title : Title,
  private meta : Meta) { 
    this.getdataRoute()
    .subscribe(data => {
      this.titulo = data.titulo;
      this.title.setTitle(this.titulo);

      const metatype : MetaDefinition = {
        name: 'description',
        content : this.titulo
      };

      this.meta.updateTag(metatype);
    }
    );

  }

  ngOnInit() {
  }

getdataRoute(){
  return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild == null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
}

}
