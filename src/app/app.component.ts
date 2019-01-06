import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Icon } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { SignPage } from '../pages/sign/sign';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AboutPage } from '../pages/about/about';
import { AddPostPage } from '../pages/add-post/add-post'; 
import { ProfileDetailsPage } from '../pages/profile-details/profile-details';
import { UserServicesProvider } from '../providers/user-services/user-services';


@Component({
  templateUrl: 'app.html',
  providers: [UserServicesProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
 
  
  public fireAuth: any;

  private userImageUrl:any;
  private userEmail: any;
  private userProfile: any;

  // rootPage: any = HomePage;
  rootPage: any = HomePage;

  pages: Array<{ icon: any, title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
   ) {
      
    this.fireAuth = firebase.auth();
    
    this.initializeApp();
   
    var that = this;
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
     that.rootPage = HomePage;

     var userIds = firebase.auth().currentUser.uid;
     
     that.displayUser(userIds);
 
       
        // ...
      } else {
        // User is signed out.
       
        that.rootPage = SignPage;
     
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'home', title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage },
      { icon: 'person', title: 'Users profile', component: ProfileDetailsPage },
      { icon: 'arrow-forward', title: 'About', component: AboutPage },
 
    ];

    this.userProfile = firebase.database().ref('users');
   
   
  }

  

  

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
        // let status bar overlay webview
      // this.statusBar.overlaysWebView(true);

        // set status bar to white
        this.statusBar.backgroundColorByHexString('#d32f2f');
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    this.nav.setRoot(page.component);
  }

  logOutUser(){
    //logout user
    return this.fireAuth.signOut().then(()=>{
        this.nav.setRoot(SignPage);
    });
  }

  viewUser(userId: any){
    var userRef = this.userProfile.child(userId);
    return userRef.once('value');
}

displayUser(UserId){
    var that = this;

    this.viewUser(UserId).then(snapshot=>{
      //get the user photo
      that.userImageUrl = snapshot.val().photo;//.photo id the name of photo in the database     
      that.userEmail = snapshot.val().email || 'email not displaying';

    });
    
  }

}
