import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServicesProvider } from '../../providers/user-services/user-services'

/**
 * Generated class for the UsersProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users-profile',
  templateUrl: 'users-profile.html',
  providers: [UserServicesProvider]
})
export class UsersProfilePage {
  private users = [];
  private userList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private usersService: UserServicesProvider) {
      this.listOurUser()
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersProfilePage');
  }
  
  listOurUser(){
    this.usersService.loadUser(10).then(data => {
      this.userList = data;
    })
  }


}
