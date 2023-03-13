import { Component, Input, Output, EventEmitter , OnInit } from '@angular/core';
import { City, Country, Employee, LocationService, State } from '../location.service'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class LocationComponent implements OnInit {
  
  locationForm!: FormGroup;

  @Input()Location : any  = {
    LocationId : '',
    LocationName : "",
    Employeer : "",
    Address : "",
    CountryId: "",
    StateId : "",
    CityId : "",
    CompanyId: 1,
    ESICNo: '',
    PFNO: "",
    Latitude : "",
    Longitude : "",
    TaxNo : "",
    NatureOfIndustry : "",
    LINNumber : ""
  };
  @Output() locationupdated = new EventEmitter<any>();
 
  locStorage = window.localStorage;
  authtoken:string = this.locStorage.getItem('authtoken')?.toString() || "";

  LocationId: number = 2;

  ngOnInit() {
    this.locationForm = new FormGroup({
      Location : new FormControl('' , [Validators.required]),
    });
    this.getCountryId();
    this.getStateId();
    this.getCityId();
    this.getEmployeer();
  }

  countryId: string = '';
  stateId : string = '';
  
  states: State[] = [];
  Employees : Employee[] = [];
  Country : Country[] =[];
  City : City[] =[];

  constructor(
    private locationService: LocationService ) { }

  getCountryId() {
    this.locationService.getCountryById(this.authtoken).subscribe((data : Country[]) => {
     this.Country = data;
    });
  }
  getStateId() {
    this.locationService.getStateById( this.authtoken, this.countryId = "1").subscribe((data : State[])=>
    {
      this.states=data;
    });
  }
  getCityId() {
    this.locationService.getCityById( this.authtoken , this.stateId = "5").subscribe((data : City[])=>
    {
      this.City=data;
    });
  }
  getEmployeer() {
    this.locationService.getEmployees(this.authtoken).subscribe((data : Employee[])=>
    {
      this.Employees=data;
    });
  } 

  onSubmit() {
    this.locationForm = new FormGroup({});
  
  for (const key in this.Location) {
    if (Object.prototype.hasOwnProperty.call(this.Location, key)) {
      const validators = [];
      if (key === 'LocationName') {
        validators.push(Validators.pattern(/^[A-Za-z -]+$/));
      }
      if (key === 'ESICNo' ||key === 'PFNO'|| key === 'Employeer' || key === 'Address' || key === 'CountryId' || key === 'StateId' || key === 'CityId' || key === 'Latitude' || key === 'Longitude' || key === 'TaxNo' || key === 'NatureOfIndustry' || key === 'LINNumber') {
        validators.push(Validators.required);
      }
      this.locationForm.addControl(key, new FormControl(this.Location[key], validators));
    }
  }  
  let emptyFields = [];
  for (const key in this.locationForm.controls) {
    if (Object.prototype.hasOwnProperty.call(this.locationForm.controls, key)) {
      const control = this.locationForm.controls[key];
      if (control.invalid) {
        emptyFields.push(key);
      }
    }
  }
  if (emptyFields.length > 0) {
    alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
    return;
  }   
    const Storage = window.localStorage;
    const authtoken = Storage.getItem('authtoken');

      const locationdata = {
      Location : this.Location,
      authtoken : authtoken
    };
    this.locationService.insertLocation(locationdata, this.authtoken).subscribe((response) => {
      console.log('InsertLocation:', response);
      alert("Data Inserted Succesfully");
    },(error: any) => {
        console.error('Error:', error);
      });     
}

updateLocation(){
  const Storage = window.localStorage;
    const authtoken = Storage.getItem('authtoken');

      const locationdata = {
      Location : this.Location,
      authtoken : authtoken
    };
    this.locationService.updateLocation(locationdata, this.authtoken).subscribe((response) => {
      console.log('UpdateLocation:', response);
      alert("Data updated Succesfully");
    },(error: any) => {
        console.error('Error:', error);
      });     
}
}
