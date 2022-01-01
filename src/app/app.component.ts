import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesFactoryService } from './services/countries-factory.service';
import { CustomersService } from './services/customers.service';

export interface CustomerPhoneNumbers{
  id:number;
  name:string;
  phone:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jumiaFE';
  formGroup!: FormGroup;
  countries!:string[];
  dataSource !: CustomerPhoneNumbers[];

  constructor(private _formBuilder:FormBuilder, 
    private coutriesService:CountriesFactoryService,
    private customersService:CustomersService ){
  }

  ngOnInit(): void{
    this.countries = this.coutriesService.getAllCountries();
    this.customersService.getAllCustomers().subscribe(result=>{
      this.dataSource = result;
    });

    this.formGroup = this._formBuilder.group({
      country: ['', Validators.required],
      state: ['',Validators.required],
    });
  }
  columns = [
    {
      columnDef: 'id',
      header: 'No.',
      cell: (element: CustomerPhoneNumbers) => `${element.id}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: CustomerPhoneNumbers) => `${element.name}`,
    },
    {
      columnDef: 'phone',
      header: 'Phone',
      cell: (element: CustomerPhoneNumbers) => `${element.phone}`,
    } 
  ];
  displayedColumns = this.columns.map(c => c.columnDef);

  filter(){
    let country = this.formGroup.controls['country'].value
    let state = this.formGroup.controls['state'].value

    this.customersService.getCustomersByCountryAndState(country,state).subscribe(results=>{
      this.dataSource = results;
    })
  }
  clearFilter(){
    this.formGroup.controls['country'].setValue('');
    this.formGroup.controls['state'].setValue('');

    this.customersService.getAllCustomers().subscribe(result=>{
      this.dataSource = result;
    });
  }
}
