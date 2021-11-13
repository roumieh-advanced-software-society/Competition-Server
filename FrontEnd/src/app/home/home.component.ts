import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHomeResponse } from '../interfaces/homeResponse';
import { AuthService } from '../services/auth.service';
import {ISectionStatus} from '../interfaces/sectionStatus';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  Teamid!: string;
  homeResponse: IHomeResponse = {teamPoints: 0, sections: [<ISectionStatus>{completed: [false, false, false], unlocked: true}]}
  styles = [
    ["background-color: rgb(181, 240, 98); border-bottom-right-radius: 0; border-bottom-left-radius: 0;",  "color: #fff; background-color:rgb(131,202,33);"],
    ["background-color: #8097f5; border-radius: 0;",  "color: #fff; background-color:rgb(86,118,245);"],
    ["background-color: rgb(250, 128, 128); border-radius: 0;",  "color: #fff; background-color:rgb(250,83,83);"]]
  constructor(private router: Router, private authService: AuthService,private http: HttpClient) { }

  ngOnInit() {
    this.Teamid = localStorage.getItem("token") || "0"; //getting from history(storage) but we have to save it again in case of reload (OnDestroy)
    //console.log(this.id);

    //progression update:
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
    /*this.http.post<IHomeResponse>('http://127.0.0.1:5000/home', {teamID}).subscribe(data => {
      this.homeResponse.teamPoints = data.teamPoints;
      this.homeResponse.sections = data.sections;
    })*/

    this.homeResponse.teamPoints = 200;
    this.homeResponse.sections = [
      {completed: [true, true, false], unlocked: true},
      {completed: [false, false, false], unlocked: true},
      {completed: [false, false, false], unlocked: false}];
  }

  onSubmit(questionNumber: number){
    console.log(questionNumber);
  }
}


