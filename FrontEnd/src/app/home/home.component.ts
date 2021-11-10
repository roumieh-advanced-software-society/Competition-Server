import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Teamid!: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.Teamid = localStorage.getItem('token') || '';
    //console.log(this.id);
  }
  logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
