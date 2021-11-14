import { HttpClient } from '@angular/common/http';
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
    /*this.http.post<string>('http://127.0.0.1:5000/question', {TeamID: this.teamID, Q_Number: this.questionID}).subscribe(data => {
      this.questionData.questionTitle = data.questionTitle;
      this.questionData.question = data.question;
      this.questionData.isCode = data.isCode;
    })*/
    this.questionData.questionTitle = "Hint: Look for a potato and boil it.";
    this.questionData.question = "This is a testing question, 1 2 3 4 5 6 6 7 8 8 9 7 5 34 2 3 4 5 5 54  3 ";
    this.questionData.isCode = false;
    }

  }

  get f() {return this.questionForm.controls}

  onSubmit(){
    if(this.questionForm.invalid){
      this.message = "What do you expect having an empty answer?";
    }
    else{
      if(this.checkAnswer(this.f.flag.value, this.f.code.value)){
        this.message = "Congrats!";
        //dont forget bel back
        localStorage.setItem("q","-1");
        this.router.navigate(['/home']);
      }
      else{
        this.message = "Try again!";
      }
    }
  }

  checkAnswer(answer: string, code:string) : boolean{
    /*this.http.post<boolean>('http://127.0.0.1:5000/verifyQuestion', {TeamID: this.teamID, Q_Number: this.questionID, Flag: this.flag, Code: this.code}).subscribe(data => {
      return data;
    })*/
    return true;
  }

}
