import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../interfaces/login';

@Component({
  selector: 'app-loginn',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private router:Router,private authService: AuthService) { }

  model: ILogin = {username: "admin", password: "admin"} //to be changed with flask querying (just for testing)
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
      if (this.f.username.value == this.model.username && this.f.password.value == this.model.password) { //communication with flask here
        this.message="Success, Redirecting";
        //this.authService.authLogin(this.model);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", this.f.username.value);
        this.router.navigate([this.returnUrl]);
      }
      else {
        this.message = "Did you really forget your username and password...";
      }
    }
  }
}
