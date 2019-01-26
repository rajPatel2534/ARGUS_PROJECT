import { Component, OnInit ,ViewChild, Input, ViewRef, OnDestroy} from '@angular/core';
import { USERS} from '../mockUsers'
import { User } from '../user';
import {MockService} from '../mockService.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn,ValidationErrors } from '@angular/forms';

import {  FormBuilder} from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-heroes',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css']
})



export class UserListComponent implements OnInit,OnDestroy {

    users: User [];
    selected : User;
   
    upForm: FormGroup;
    selectedKey : number;
    selectDeleteName : string;
    updateKey : number;
    subsription : Subscription;
    key: string = 'name'; //set default
    reverse: boolean = false;
    fullLoaded : boolean = false;
    updateDOBDefault : Date;
    sort(key){
       this.key = key;
       this.reverse = !this.reverse;
     }
     p: number = 1;

 constructor(public datepipe: DatePipe,private fb:FormBuilder,private mockService : MockService) { 
    
  }

  
  ngOnInit() {
    this.getUsers();
  }

  updateForm(key : number)
  {
   
    console.log(key);
    let index = this.mockService.getIndex(key);
    console.log("index"+index);
    if(index >=0)
    {
    this.upForm = this.fb.group({
     name: [ this.users[index].name,  Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z]{2}[a-zA-Z ]{0,16}[a-zA-Z]{2}$')
    ])],
     dob : [this.updateDOBDefault , Validators.compose([
      Validators.required,
      validateDOB
    ])],
     city : [this.users[index].city , Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z]{2,20}$')
    ])],
     mobile : [this.users[index].mobile, Validators.compose([
      Validators.required,
      Validators.pattern('[6789][0-9]{9}')
    ])]
  });
    }
  }
  
  getUsers(): void{
    this.subsription = this.mockService.getUsers().subscribe(users => this.users = users);
  }  
  setDeleteIndex(ind : number,name : string)
  {
    
    this.selectedKey = ind;
    this.selectDeleteName = name;
  }

  delete(ind : number)
  {
    if(this.selectedKey>0){
      this.mockService.delete(this.selectedKey);
      this.selectedKey=null;
    }
    
  }
  
  cancel(){
    this.selectedKey = -1;
    this.updateKey  = null;
  }

  update(uname : string , umobile : string, udob : string , ucity : string , index : number,key : number)
  {
    console.log("key"+key);
    if(this.updateKey == key)
    {
      console.log('true');
      this.updateKey = undefined;
      this.save(key);
    }
    else
    {
      console.log('false'+udob);
      this.updateKey = key;
      console.log(this.updateDOBDefault);
      this.updateDOBDefault = this.convertDate(udob);
      console.log(this.updateDOBDefault);
      
      
      this.updateForm(key);
    }
  }

  save(key : number)
  {
    let index=this.mockService.getIndex(key);

    if(index >= 0)
    {
      this.mockService.update(this.upForm.get('name').value,this.upForm.get('mobile').value,this.datepipe.transform(this.upForm.get('dob').value, 'dd-MM-yyyy'),this.upForm.get('city').value,index);
    }
  }

  convertDate(date : string): Date
  {
    const str = date.split('-');

      const year = Number(str[2]);
      const month = Number(str[1])-1 ;
      const dateOfMonth = Number(str[0]);
    return new Date(year,month,dateOfMonth);
  }

  ngOnDestroy()
  {
    this.subsription.unsubscribe();
  }

}

export function validateDOB(control: AbstractControl) : ValidationErrors | null
{

    let currentDateTime = new Date();
    let oldDateTime = new Date(currentDateTime.getFullYear()-100,currentDateTime.getMonth(),currentDateTime.getDate());
    let newDateTime = new Date(currentDateTime.getFullYear()-10,currentDateTime.getMonth(),currentDateTime.getDate());
    oldDateTime.setHours(0,0,0,0);
    newDateTime.setHours(0,0,0,0);
    currentDateTime.setHours(0,0,0,0);
    // console.log(currentDateTime);
    let controlValue = new Date(control.value);
    controlValue.setHours(0,0,0,0);

    console.log(currentDateTime+'-'+controlValue)

    if(oldDateTime<controlValue && newDateTime>controlValue)
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