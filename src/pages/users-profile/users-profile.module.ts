import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersProfilePage } from './users-profile';

@NgModule({
  declarations: [
    UsersProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UsersProfilePage),
  ],
})
export class UsersProfilePageModule {}
