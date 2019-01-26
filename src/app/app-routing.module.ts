import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './userList/userList.component'
import { AppComponent } from './app.component';
import {AddComponent} from './add/add.component';
const routes: Routes = [
  { path: '', component : UserListComponent , pathMatch: 'full' },
  { path: 'list', component : UserListComponent },
  {path:'add' , component : AddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
