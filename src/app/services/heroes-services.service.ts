import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class HeroesServicesService {


  private url='https://login-6f1bf.firebaseio.com'
  constructor( private http:HttpClient) { 


  }

deleteHereo(id:string){
 return this.http.delete(`${this.url}/heroes/${id}.json`);
}

findHeroe(id:string){
  return this.http.get(`${this.url}/heroes/${id}.json`);
}

getHeroes(){
   return this.http.get(`${this.url}/heroes.json`).pipe( map( this.arrayConverter))

}
private arrayConverter(obj:Object){

const heroes:HeroeModel[]=[];

//si el objeto viene vacio quiere decir que no hay registros asi que regresa un arreglo vacio
if (obj===null) {
  return [];
  
} else {
  //voy a barrer todo el objeto
  Object.keys(obj).forEach(key=>{
  

    //creo una variable de tipo heroe para asignarle cada una de las posiciones del objeto
   const heroe:HeroeModel= obj[key];
   //le paso los valores del primer registro y le asigno su id de referencia
   heroe.id=key;
   // lo agregamos en mi arreglo vacio de heroes
 heroes.push(heroe);

  });
  
// mando el arreglo
  return heroes;
  ;



}

console.log();

}



setHeroe(heroe:HeroeModel){


//agrego el id al heroe y regreso el heroe completo como un tipo heroe

 return this.http.post(`${this.url}/heroes.json`,heroe).pipe(
   map((res:any)=>{
     heroe.id=res.name;
     return heroe;
   })
 )
}

updateHeroe(heroe:HeroeModel){
const heroeTemp={
  ...heroe
}

delete heroeTemp.id

 return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroeTemp)

}

}
