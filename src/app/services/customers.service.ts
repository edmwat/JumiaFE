import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerPhoneNumbers } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  baseUrl:string ="http://localhost:8080/phone";
  
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type':'application/json'
  });

  constructor(private http:HttpClient) { }

  getAllCustomers():Observable<CustomerPhoneNumbers[]>{
    return this.http.get<CustomerPhoneNumbers[]>(this.baseUrl+"/all",{headers:this.headers});
  }

  getCustomersByCountryAndState(country:string,state:string){
    return this.http.get<CustomerPhoneNumbers[]>(this.baseUrl+`${'/'+country+'/'+state}`, {headers:this.headers});
  }
}
