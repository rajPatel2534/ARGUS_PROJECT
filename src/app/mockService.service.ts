import { Injectable } from '@angular/core';
import {User} from './user';
import {USERS} from './mockUsers';
import {Observable , of} from 'rxjs';
import { UserListComponent } from './userList/userList.component';


@Injectable({
  providedIn: 'root'
})
export class MockService {

  users : User[] = USERS;
  maxKey : number = this.users.length;

  constructor() { }

  getUsers():Observable<User[]>
  {
  
    return of(this.users);
  }

  update(uname : string , umobile : string , udob : string , ucity : string,index : number)
  {

      this.users[index].name = uname;
      this.users[index].mobile = parseInt(umobile);
      this.users[index].dob = udob;
      this.users[index].city = ucity;

  }


  delete(key : number)
  {   
    let index=this.getIndex(key);
    
    if(index>=0){
        this.users.splice(index,1);
      }
      
  }

  getIndex(key : number):number
{
  console.log(key);
  let index = -1;
      for(let i=0;i<this.users.length;i++) {
        if(this.users[i].key == key){
          index = i;
          console.log(index);
          break;
        }
      }
      if(index>=0){
          return index;
      }
  return -1;
}

  
  add(uname : string , umobile : string , udob : string , ucity : string)
  {


      this.users.push(
        {
          key : this.maxKey+1,
          name: uname,
          mobile : parseInt(umobile),
          dob : udob ,
          city :ucity
        
        }
      )
        this.maxKey++;
        console.log(this.maxKey);

  }

}
