import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesFactoryService {

  constructor() { }

  countriesArray:string[] = ["Cameroon","Ethiopia","Morocco","Mozambique","Uganda"];

  getAllCountries(){
    return this.countriesArray;
  }
}
