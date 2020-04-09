import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesServicesService } from 'src/app/services/heroes-services.service';
import  Swal from "sweetalert2";
import { observable, Observable } from "rxjs";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {



  heroe= new HeroeModel();

  constructor(private heroeService:HeroesServicesService,private  route:ActivatedRoute) { }

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');

  if (id!=='nuevo') {
    this.heroeService.findHeroe(id).subscribe((resp:HeroeModel)=>{


 this.heroe=resp;
 this.heroe.id=id;     
    })

  }
  }



  guardar(form:NgForm){
 if (form.invalid) {
   return;
 }

//pop windows with loading
   Swal.fire({
    title:'Espere',
    text:'guardando informacion',
    icon:'info',
    allowOutsideClick:false

   });
   Swal.showLoading();



// se crea un observable para poder capturar la respuesta 
let request: Observable<any>; 

 if (this.heroe.id) {
  request= this.heroeService.updateHeroe(this.heroe)
 } else {
  request=this.heroeService.setHeroe(this.heroe)
 }


  //la respuesta es leida y se puede cerrar el loading pop
  request.subscribe(resp=>{

     Swal.fire({
       title:this.heroe.nombre,
       text:'se actualizo correctamente',
       icon:'success'
     })
  })
  }



 
}
