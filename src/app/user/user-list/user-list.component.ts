import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public usersList: Array<any>;
  public showForm: boolean;
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    // method call
    this.showForm = false;
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
      if (res) {
        this.usersList = res;
        console.log('this.usersList', this.usersList);
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
    this.showForm = true;
  }
}
