import { Component  , OnInit  , Output , EventEmitter} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent implements OnInit {

  locStorage = window.localStorage;
  authtoken:string = this.locStorage.getItem('authtoken')?.toString() || "";
  
 gridData: any[] =  [];

 selectedLocation: any = {
  LocationName: '',
  LocationId: '',
  CityId: '',
  StateId: '',
  CountryId: '',
  Employeer: '',
  Latitude: '',
  Longitude: '',
  ESICNo: '',
  PFNO: '',
  TaxNo: '',
  RegistrationNo: '',
  NatureOfIndustry: '',
  Address: ''
};
  currentPage: any;
  totalPages: any;
  totalRecords: any;

   ngOnInit() {
    this.gridlocation();  
  }

  constructor ( private http: HttpClient) { }

  gridlocation() {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authtoken}`
  });
  
  const gridParams = {
    totalRecords: 0,
    paginationList: 1,
    list: [],
    columns: {
      Action: '',
      Date: '',
      Employeer: '',
      LocationName : '',
      Latitude: '',
      Longitude: '',
      ESICNo: '',
      PFNO: '',
      TaxNo: '',
      PTaxNo: '',
      RegistrationNo: '',
      NatureOfIndustry: '',
      Address: ''
    },
    searchValue: '',
    currentPage: '1',
    perPage: '10',
    direction: 'desc',
    sortColumn: 'string'
  };
  const data = {
    GridParams: gridParams,
    authtoken: this.authtoken,
    CreatedIP: '',
    SessionCompanyId: '',
    SessionCalendarId: ''
  };
  this.http.post<any>('http://192.168.0.213:5019/api/location/grid', data, { headers }).subscribe(
    (response : any) => {
      console.log('Grid Response:', response);
      this.gridData = response.List;
      console.log(this.gridData);
    },
    (error: any) => {
      console.error('Error:', error);
    });
  }

  @Output() locationupdated:EventEmitter<any> = new EventEmitter<any>();

  editLocation(Location : any) {
    const headers =new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const LocationId =Location.LocationId;
    const authtoken = this.authtoken;
    const data = {
      Location : {
        LocationId : LocationId
      },
      'authtoken' : authtoken,
      "CreatedIP": "",
      "SessionCompanyId": "",
      "SessionCalendarId": ""
    };
    return this.http.post<any>('http://192.168.0.213:5019/api/location/edit', data, { headers }).subscribe(
      (response : any) => {
        console.log('Edit Response' , response);
        this.selectedLocation = Location;
      },
      (error:any) => {
        console.log('Error' , error);
      });
  } 

  deleteLocation(Location : any) {
    const headers =new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const LocationId = Location.LocationId;
    const authtoken = this.authtoken;
    const data = {
      Location : {
        LocationId : LocationId,
        Active : false
      },
      'authtoken' : authtoken,
      "CreatedIP": "",
      "SessionCompanyId": "",
      "SessionCalendarId": ""
    };
    const confirmed = confirm(`Are you sure you want to delete the location '${Location.LocationName}'?`);
    if (!confirmed) {
        return; 
    }
    return this.http.post<any>('http://192.168.0.213:5019/api/location/deactive', data , {headers}).subscribe(
      (response : any)=> {
        console.log('delete response' , response);
        this.gridData = this.gridData.filter(l => l.LocationId !== LocationId);
        if(confirmed){
          alert("Location delected succesfully");
        }
      },     
      (error : any) => {
        console.log('Error' , error);
      });
  }
}