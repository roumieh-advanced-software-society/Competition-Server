import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionID!: string;
  question!:string;
  flag!:string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.questionID = localStorage.getItem("q")|| "";
    }



}
