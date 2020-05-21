import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

/*   public fname: string;
  public lname: string;
  public city: string;
  public email: string;
  public pincode: string; */

  constructor() { }

  ngOnInit(): void {
  }

 /*  public onSubmit(userForm: NgForm): void{
    console.log('userForm', userForm.value);
    alert('Form Submitted');
    userForm.reset();
  } */
  public onSubmit(userForm: NgForm): void{
    console.log('userForm', userForm.value);
    alert('Form Submitted');
    userForm.reset();
  }
}
