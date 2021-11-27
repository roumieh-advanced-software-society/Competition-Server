import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../interfaces/login';
import { ILoginResponse } from '../interfaces/LoginResponse';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-loginn',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private router:Router,private authService: AuthService, private http: HttpClient) { }

  model: ILogin = {username: "admin", password: "admin"} //to be changed with flask querying (just for testing)
  loginResponse: ILoginResponse = {success: false, team_id: "0"};
  loginForm!: FormGroup;
  message!: string;
  returnUrl!: string;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  });
  body = new HttpParams();

  ngOnInit(): void {

    //Validation Form
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    this.returnUrl = '/home';
    this.authService.logout();  //logging out to stop user from re-entering /home page after visiting login again
  }

  get f() {return this.loginForm.controls}

  login() {

    if (this.loginForm.invalid) {
       this.message = "Fill All Fields! We want to compete!";
    }
    else{
        
       this.http.post<ILoginResponse>('http://20.79.219.204:5000/login?username='+this.f.username.value+'&password='+this.f.password.value, {headers: this.headers}).toPromise().then(data => {
       this.loginResponse.success = data.success;
       this.loginResponse.team_id = data.team_id;
       
      if(this.loginResponse.success){
         this.message="Success, Redirecting";
         
         localStorage.setItem("isLoggedIn", "true");
         localStorage.setItem("token", this.loginResponse.team_id);
	 localStorage.setItem("username",this.f.username.value);
         this.router.navigate([this.returnUrl]); 
       }
       else {
         this.message = "Did you really forget your username and password...";
       }
      })
     
    }
  }
}


