import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() public userRecord: any = {};
  @Output() public ngFormSubmit: EventEmitter<any> = new EventEmitter();
  @Output() public ngFormCancel: EventEmitter<any> = new EventEmitter();

  public userForm: FormGroup;
  public emailPattern: string = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public phonePattern: string = '^[0-9-+s()]*$';
  public isValidFormSubmitted = null;
  public buttomLabel: string;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.buttomLabel = "Save";
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

    if (this.userRecord.id) {
      this.buttomLabel = "Update";
      this.setRecordToForm();
    }
  }

  /*  public onSubmit(userForm: NgForm): void{
     console.log('userForm', userForm.value);
     alert('Form Submitted');
     userForm.reset();
   } */
  public get f() {
    return this.userForm.controls;
  }

  public setRecordToForm(): void {
    this.userForm.patchValue(this.userRecord);
  }

  /**
   * @description Method to post data in server
   * @author Virendra Pandey
   * @date 2020-05-27
   * @returns {void}
   * @memberof CreateUserComponent
   */
  public onSubmit(): void {
    console.log('userForm', this.userForm.value);
    this.isValidFormSubmitted = false;
    console.log('this.userForm.invalid', this.userForm.invalid);
    if (this.userForm.invalid) {
      return;
    }

    if (this.userRecord.id) {
      this._userService.updateUser(this.userRecord.id, this.userForm.value).subscribe(res => {
        console.log('res', res);
        if (res) {
          this.ngFormSubmit.emit(true);
          this.userForm.reset();
        }
      }, err => {
        console.log(err);
      });
    } else {
      this._userService.postUser(this.userForm.value).subscribe(res => {
        console.log('res', res);
        if (res) {
          this.ngFormSubmit.emit(true);
          this.userForm.reset();
        }
      }, err => {
        console.log(err);
      });
    }
  }

  public onCancel(): void {
    this.ngFormCancel.emit(true);
  }
}
