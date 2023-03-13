import { Component , OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  employeeNo: any;
  password: any;

  constructor(private loginservice : LoginService, private router: Router , private http : HttpClient) { }
  ngOnInit() {  }

  onSubmit() {
    const Storage = window.localStorage;
    const employee = {
      Employee : {
        EmployeeNo : this.employeeNo,
        Password : this.password
      },
      authtoken: '',
      CreatedIP: '',
      SessionCompanyId: '',
    };
    this.loginservice.login(employee).subscribe((response) => {
      console.log(response);
      if (response && response.status === "success") {
        Storage.setItem('authtoken' , response.authtoken);
        this.router.navigate(['/grid']);
        alert("login Succesufully");
      }
      else{
        alert("detalis wrong")
      }
    });
  }
}
