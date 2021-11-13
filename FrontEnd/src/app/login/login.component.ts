import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../interfaces/login';
import { ILoginResponse } from '../interfaces/LoginResponse';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loginn',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private router:Router,private authService: AuthService, private http: HttpClient) { }

  model: ILogin = {username: "admin", password: "admin"} //to be changed with flask querying (just for testing)
  loginResponse: ILoginResponse = {success: false, teamID: "0"};
  loginForm!: FormGroup;
  message!: string;
  returnUrl!: string;


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
    else {
      if (this.checkCredentials(this.f.username.value,this.f.password.value)) { //communication with flask here
        this.message="Success, Redirecting";
        //this.authService.authLogin(this.model);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", this.loginResponse.teamID);
        this.router.navigate([this.returnUrl]); //sending data between routes
      }
      else {
        this.message = "Did you really forget your username and password...";
      }
    }
  }

  checkCredentials(un: string, pswrd: string){ //:Observable<User>{
    //post username and password to flask

    //get success boolean and TeamID string
    //return this.http.get(apiUrl+"/login").catch(services._handleError);

    /*this.http.post<ILoginResponse>('http://127.0.0.1:5000/login', {username: un, password: pswrd}).subscribe(data => {
      this.loginResponse.success = data.success;
      this.loginResponse.teamID = data.teamID;
      console.log(data.success);
    })*/
    if(un=="admin" && pswrd=="admin"){
      this.loginResponse.success = true;
      this.loginResponse.teamID = "AA11"; //better to be a guid
    }

    else{
      this.loginResponse.success = false;
    }


    return this.loginResponse.success;
  }

}
