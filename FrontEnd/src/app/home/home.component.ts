import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHomeResponse } from '../interfaces/homeResponse';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  Teamid!: string;
  homeResponse: IHomeResponse = {teamPoints: 0, sections: [true, false, false, false, false, false, false, false, false]}

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
    this.homeResponse.sections = [false, false, false, false, true, true, false, true, true];
  }
}


