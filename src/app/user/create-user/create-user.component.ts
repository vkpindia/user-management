import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../services';

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
  public userForm: FormGroup;
  public emailPattern: string = '[a-aA-Z0-9.-_]{1,}@[a-zA-Z.-][.]{1}[a-zA-Z]{2,}';
  public phonePattern: string = '^[0-9-+s()]*$';
  public isValidFormSubmitted = null;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.phonePattern)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      address: new FormGroup({
        country: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required)
      })
    });
  }

  /*  public onSubmit(userForm: NgForm): void{
     console.log('userForm', userForm.value);
     alert('Form Submitted');
     userForm.reset();
   } */
  public get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  public onSubmit(): void {
    console.log('userForm', this.userForm.value);
    this.isValidFormSubmitted = false;
    if (this.userForm.invalid) {
      return;
    } else {
      this._userService.postUser(this.userForm.value).subscribe(res => {
        if (res) {
          this.userForm.reset();
        }
      });
    }
  }
}
