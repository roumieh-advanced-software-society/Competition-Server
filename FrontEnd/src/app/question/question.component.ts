import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IQuestionResponse } from '../interfaces/questionResponse';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

  constructor(private formBuilder:FormBuilder, private http: HttpClient, private router: Router) { }

  teamID!: string;
  questionID!: string;
  questionData: IQuestionResponse = {questionTitle: "", question:"", isCode: false}
  flag!:string;
  code: string ="";
  message!:string;
  questionForm!: FormGroup;
  success: boolean = false;
  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });



  ngOnInit(): void {

    this.questionForm = this.formBuilder.group({
      flag: ['', Validators.required],
      code: ['']
    });

    this.questionID = localStorage.getItem("q")|| "-1";
    this.teamID = localStorage.getItem("token") || "0";
    this.populatePage();

  }

  ngOnDestroy(): void {
    localStorage.setItem("q","-1");
  }

  populatePage(){
    if(this.questionID=="-1"){
      this.router.navigate(['/home']);
    }
    else{
    this.http.post<IQuestionResponse>('http://20.79.219.204:5000/getQuestion?TeamID='+this.teamID+'&Q_Number='+this.questionID, {headers: this.headers}).toPromise().then(data => {
      this.questionData.questionTitle = data.questionTitle;
      this.questionData.question = data.question;
      this.questionData.isCode = data.isCode;
    })
   }
  }
  get f() {return this.questionForm.controls}

  onSubmit(){
    if(this.questionForm.invalid){
      this.message = "What do you expect having an empty answer?";
    }
    else{
	
    this.http.post<{correct: boolean}>('http://20.79.219.204:5000/verifyQuestion?TeamID='+this.teamID+'&Q_Number='+this.questionID+'&Flag='+this.f.flag.value+"&Code="+this.f.code.value, {headers: this.headers}).toPromise().then(data => {
      this.success = data.correct;
     	
      if(this.success){
        this.message = "Congrats!";
        
        localStorage.setItem("q","-1");
        this.router.navigate(['/home']);
      }
      else{
        this.message = "Try again!";
      }
    })
    }
  }
}
