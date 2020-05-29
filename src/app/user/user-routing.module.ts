import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';


const newLocal = 'adduser';
const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: newLocal,
    component: UserListComponent
  },
  {
    path: 'edit/:id',
    component: EditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
