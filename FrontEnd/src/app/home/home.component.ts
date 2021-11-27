import { state } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHomeResponse } from '../interfaces/homeResponse';
import { AuthService } from '../services/auth.service';
import {ISectionStatus} from '../interfaces/sectionStatus';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  Teamid!: string;
  homeResponse: IHomeResponse = {teamPoints: 0, section: [<ISectionStatus>{completed: [false, false, false], unlocked: true}]}
  styles = [
    ["background-color: rgb(181, 240, 98); border-bottom-right-radius: 0; border-bottom-left-radius: 0;",  "color: #fff; background-color:rgb(131,202,33);"],
    ["background-color: #8097f5; border-radius: 0;",  "color: #fff; background-color:rgb(86,118,245);"],
    ["background-color: rgb(250, 128, 128); border-radius: 0;",  "color: #fff; background-color:rgb(250,83,83);"]]

  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });

    username: string ="";
		
  constructor(private router: Router, private authService: AuthService,private http: HttpClient,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.Teamid = localStorage.getItem("token") || "0"; //getting from history(storage) but we have to save it again in case of reload (OnDestroy)
    this.username=localStorage.getItem("username")||"";
    this.updateProgression(this.Teamid);
  }

  ngOnDestroy(): void {
  }

  logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  updateProgression(teamID: string){
	  console.log(teamID);
    this.http.post<IHomeResponse>('http://20.79.219.204:5000/home?TeamID='+teamID, {headers: this.headers}).toPromise().then(data => {
	console.log(data);
      this.homeResponse.teamPoints = data.teamPoints;
      this.homeResponse.section = data.section;
    })
  }

  onSubmit(questionNumber: number){
    localStorage.setItem("q",questionNumber.toString());
    this.router.navigate(['/question']);
  }


  openSnackBar() {
    this._snackBar.open("What Are you trying to do?", "Dismiss", {
      duration: 2000,
    });
  }
}


