import { Component, OnInit } from '@angular/core';
import { HeroesServicesService } from 'src/app/services/heroes-services.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroes:HeroesServicesService, private router:ActivatedRoute) { }
heroesList:HeroeModel[];
  ngOnInit(): void {
   this.cargarHeroes();
   
  }


cargarHeroes(){
this.heroes.getHeroes().subscribe(resp=>{
 console.log(resp);
 this.heroesList=resp;
})

}

delete(heroe:HeroeModel,i:number){
//pop para saber si quiere eliminar y est6e regresa una promesa
Swal.fire({
title:` Estas seguro que quieres eliminar a ${heroe.nombre}`,
icon:'warning',
showCancelButton:true,
showConfirmButton:true
}).then(resp=>{
// si la promesa regresa el value true se realiza la accion
if (resp.value) {
 
  this.heroes.deleteHereo(heroe.id).subscribe(resp=>{
    this.heroesList.splice(i,1);
    Swal.fire({
      title:'Heroe eliminado',
      icon:'success'
    })
  
  });

} 


})


  



}

}
