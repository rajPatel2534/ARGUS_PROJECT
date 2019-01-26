import { Component, OnInit, OnDestroy } from '@angular/core';
import {MockService} from '../mockService.service'
import { Router } from '@angular/router';

import { routerNgProbeToken } from '@angular/router/src/router_module';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';

import {  FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit,OnDestroy {

  err: string;
  submitted = false;
  angForm: FormGroup;


  constructor(public dobpipe: DatePipe,private fb:FormBuilder,private router : Router,private mockService : MockService) {

    this.createForm();
   }

  ngOnInit() {

  }

  createForm() {
    this.angForm = this.fb.group({
       name: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]{2}[a-zA-Z ]{0,16}[a-zA-Z]{2}$')
      ])],
       dob : ['',Validators.compose([
        Validators.required,
        validobDOB
      ])],
       city : ['' , Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]{2,20}$')
      ])],
       mobile : ['', Validators.compose([
        Validators.required,
        Validators.pattern('[6789][0-9]{9}')
      ])]
    });
  }
  string
  isdobValid(control : AbstractControl)
  {
      const dobControl= this.angForm.get('dob');

      
  }
  add(uname : string , umobile : string , udob : Date , ucity : string)
  {
    console.log(udob);
   
       this.err="";
       this.mockService.add(uname,umobile,this.dobpipe.transform(udob, 'dd-MM-yyyy'),ucity);
       this.router.navigate(['/','list']);
    

  }

  cancel()
  {
    console.log("cancel");
    this.router.navigate(['/','list']);
  }

  onSubmit(studentform): void { 
    
//    this.students1.push(studentform.value);
    this.router.navigate(['../display-students']);

}

  ngOnDestroy()
  {

  }

}
export function validobDOB(control: AbstractControl) : ValidationErrors | null
{

    let currentdobTime = new Date();
    let olddobTime = new Date(currentdobTime.getFullYear()-100,currentdobTime.getMonth(),currentdobTime.getDate());
    let newdobTime = new Date(currentdobTime.getFullYear()-10,currentdobTime.getMonth(),currentdobTime.getDate());
    olddobTime.setHours(0,0,0,0);
    newdobTime.setHours(0,0,0,0);
    currentdobTime.setHours(0,0,0,0);
    // console.log(currentdobTime);
    let controlValue = new Date(control.value);
    controlValue.setHours(0,0,0,0);

    console.log(currentdobTime+'-'+controlValue)

    if(olddobTime<controlValue && newdobTime>controlValue)
    {
        console.log("true");

        return null;
    }
    else
    {
      console.log("false");
      return { pattern : true , status : 'INVALID'};
      
    }

}
export function patternValidator(regexp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value;
    if (value === '') {
      return null;
    }
    return !regexp.test(value) ? { 'patternInvalid': { regexp } } : null;
  };
}