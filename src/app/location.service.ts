import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Country {
  Text: string;
  Value: string;
  Disabled: boolean;
}

export interface CountryResponse {
  List: Country[];
  status: string;
  message: any;
}

export interface State {
  Text: string;
  Value: string;
  Disabled: boolean;
}

export interface StateResponse {
  List: State[];
  status: string;
  message: any;
}

export interface City {
  Text: string;
  Value: string;
  Disabled: boolean;
}
export interface CityResponse {
  List: City[];
  status: string;
  message: any;
}

export interface Employee {
  Text: string;
  Value: string;
  Disabled: boolean;
}

export interface EmployeeResponse {
  List: Employee[];
  status: string;
  message: any;
}

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  apiUrl = 'http://192.168.0.213:5019/api/location/insert';
     
  constructor(private http: HttpClient) {}
    
  getCountryById(authtoken : string):Observable<Country[]> {
    const headers  = new HttpHeaders ({
      'Content-Type': 'application/json',
    });
    const data = {
      'authtoken': authtoken,
      'CreatedIP': '',
      'SessionCompanyId': '',
      'SessionCalendarId': ''
    };
    return this.http.post<CountryResponse>('http://192.168.0.213:5019/api/dropdown/country', data , {headers}).pipe(
      map(response => response.List));
  }

  getEmployees(authtoken : string) :Observable<Employee[]> {
    const headers  = new HttpHeaders ({
      'Content-Type': 'application/json',
    });
    const data = {
      'authtoken': authtoken,
      'CreatedIP': '',
      'SessionCompanyId': '',
      'SessionCalendarId': ''
    };
    return this.http.post<EmployeeResponse>('http://192.168.0.213:5019/api/dropdown/allemployee', data , {headers}).pipe(
      map(response => response.List));
  }

  getStateById(authtoken : string, countryId : string) : Observable<State[]> {
    const headers =new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const data = {
      'authtoken': authtoken,
      'CountryId': countryId,
      'CreatedIP': '',
      'SessionCompanyId': '',
      'SessionCalendarId': ''
    };
  return this.http.post<StateResponse>('http://192.168.0.213:5019/api/dropdown/state', data, { headers }).pipe(
    map(response => response.List));
  }
   
  getCityById(authtoken : string , stateId : string ): Observable<City[]> {
    const headers =new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const data = {
      'authtoken': authtoken,
      'StateId': stateId,
      'CreatedIP': '',
      'SessionCompanyId': '',
      'SessionCalendarId': ''
    };  
  return this.http.post<CityResponse>('http://192.168.0.213:5019/api/dropdown/city', data, { headers }).pipe(
    map(response => response.List));
  }
  
 insertLocation(locationData : any, authtoken :string) : Observable<any>{
     const headers =new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authtoken}`
      });
        return this.http.post<any>('http://192.168.0.213:5019/api/location/insert', locationData, {headers})  
 }

updateLocation(locationData : any, authtoken :string):Observable<any> {
  const headers =new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authtoken}`
  });
    return this.http.post<any>('http://192.168.0.213:5019/api/location/update', locationData, {headers})  
} 
}
