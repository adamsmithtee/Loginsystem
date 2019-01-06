import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PopoverPage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AboutPage } from '../pages/about/about';
import { SignPage } from '../pages/sign/sign';
import { SignupPage } from '../pages/signup/signup';
import { UsersProfilePage } from '../pages/users-profile/users-profile';
import { ProfileDetailsPage } from '../pages/profile-details/profile-details';
import { ModalcontentPage } from '../pages/modalcontent/modalcontent';
import { AddPostPage } from '../pages/add-post/add-post'; 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserServicesProvider } from '../providers/user-services/user-services';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import * as firebase from 'firebase';
import { PostsServiceProvider } from '../providers/posts-service/posts-service';
import { SMS } from '@ionic-native/sms';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera } from '@ionic-native/camera';
import { ImageServiceProvider } from '../providers/image-service/image-service';
import { DatabaseServiceProvider } from '../providers/database-service/database-service';
// Initialize Firebase
export const config = {
  apiKey: "AIzaSyBpNmYMq986iL3KU94YlhK7QPDyTZez24c",
  authDomain: "socialapp-b7e39.firebaseapp.com",
  databaseURL: "https://socialapp-b7e39.firebaseio.com",
  projectId: "socialapp-b7e39",
  storageBucket: "socialapp-b7e39.appspot.com",
  messagingSenderId: "1044604681078"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AboutPage,
    SignPage,
    SignupPage,
    UsersProfilePage,
    ProfileDetailsPage,
    AddPostPage,
    PopoverPage,
    ModalcontentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AboutPage,
    SignPage,
    SignupPage,
    UsersProfilePage,
    ProfileDetailsPage,
    AddPostPage,
    PopoverPage,
    ModalcontentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServicesProvider,
    PostsServiceProvider,
    SocialSharing,
    SMS,
    Camera, 
    ImageServiceProvider,
    DatabaseServiceProvider
  ]
})
export class AppModule {}
