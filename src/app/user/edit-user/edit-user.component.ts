import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public userId: number;
  public userRecord: any;
  public showForm: boolean;
  constructor(private _activatedRoute: ActivatedRoute
    , private _router: Router
    , private _userService: UserService) { }

  ngOnInit(): void {
    this.showForm = false;
    this._activatedRoute.paramMap.subscribe(param => {
      if (param) {
        this.userId = param['params'].id;
        console.log('this.userId', this.userId);
      }
    });
    this.getUserRecord();
  }

  /**
   * @description Method to get user decord by ID
   * @author Virendra Pandey
   * @date 2020-05-28
   * @memberof EditUserComponent
   */
  public getUserRecord(): void {
    this._userService.getUserByID(this.userId).subscribe(res => {
      if (res) {
        this.userRecord = res;
        this.showForm = true;
        console.log('this.userRecord', this.userRecord);
      }
    }, err => {
      console.log(err);
    });
  }

  public onFormCancel(event): void {
    if (event) {
      this._router.navigate([''], { relativeTo: this._activatedRoute });
    }
  }
  public onFormSubmit(event): void {
    if (event) {
      this._router.navigate([''], { relativeTo: this._activatedRoute });
    }
  }
}
