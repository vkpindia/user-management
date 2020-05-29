import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public usersList: Array<any>;
  public showForm: boolean;
  public isCreate: boolean;
  constructor(private _userService: UserService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    // method call
    this.showForm = false;
    this.isCreate = false;
    // console.log('this._route.routeConfig.path', this._route.routeConfig);
    if (this._route.routeConfig.path === 'adduser') {
      this.isCreate = true;
      this.showForm = true;
    }
    this.getUserList();
  }

  /**
   * @description Method to get users list
   * @author Virendra Pandey
   * @date 2020-05-17
   * @memberof UserListComponent
   */
  public getUserList(): void {
    this._userService.getUsers().subscribe(res => {
      // console.log('res', res);
      if (res) {
        this.usersList = res;
        // console.log('this.usersList', this.usersList);
      }
    }, err => {
      console.log(err);
    });
  }

  /**
   * @description Method to open form
   * @author Virendra Pandey
   * @date 2020-05-18
   * @memberof UserListComponent
   */
  public openForm(): void {
    this._router.navigate(['adduser'], { relativeTo: this._route.parent });
    this.showForm = true;
    this.isCreate = true;
  }

  /**
   * @description Method to trigger on form submit
   * @author Virendra Pandey
   * @date 2020-05-28
   * @param {*} event
   * @memberof UserListComponent
   */
  public onFormSubmit(event): void {
    console.log('event', event);
    if (event) {
      this.showForm = false;
      this.isCreate = false;
      this._router.navigate([''], { relativeTo: this._route });
      this.getUserList();
    }
  }

  /**
   * @description Method to trigger on form cancel
   * @author Virendra Pandey
   * @date 2020-05-28
   * @param {*} event
   * @memberof UserListComponent
   */
  public onCancel(event): void {
    if (event) {
      this.showForm = false;
      this.isCreate = false;
      this._router.navigate([''], { relativeTo: this._route });
    }
  }

  /**
   * @description Method to delete user record from list
   * @author Virendra Pandey
   * @date 2020-05-28
   * @param {number} userId
   * @memberof UserListComponent
   */
  public onDeleteUser(userId: number): void {
    this._userService.deleteUser(userId).subscribe(res => {
      if (res) {
        this.getUserList();
      }
    });
  }

  /**
   * @description Method to Edit user record from list
   * @author Virendra Pandey
   * @date 2020-05-28
   * @param {number} userId
   * @memberof UserListComponent
   */
  public onEditUser(userId: number): void {
    if (userId) {
      this._router.navigate(['edit', userId], {relativeTo: this._route});
    }
  }
}
