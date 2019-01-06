import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, MenuController, PopoverController, ViewController } from 'ionic-angular';

// import { AboutPage } from '../about/about';
import { SignPage } from '../sign/sign';
import { SignupPage } from '../signup/signup';
import { UsersProfilePage } from '../users-profile/users-profile';
import { AddPostPage } from '../add-post/add-post'; 
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { UserServicesProvider } from '../../providers/user-services/user-services';
import { PostsServiceProvider } from '../../providers/posts-service/posts-service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';


// popover page view
@Component({
  template: `
  <ion-list no-lines>
    <button ion-item (click)="redirectToaddPostPage()">Add a post</button>
    <button ion-item (click)="close()">View all post</button>
    <button ion-item (click)="close()">View friends request</button>
  </ion-list>
  `
})

export class PopoverPage {
  constructor(public viewCtrl: ViewController, public navCtrl: NavController) {}

  close() {
    this.viewCtrl.dismiss();
  }

  redirectToaddPostPage(){
    this.navCtrl.push(AddPostPage).then(()=>{
      this.viewCtrl.dismiss();
    });

  }
 
  
}

//end of popover*******************************************************************

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UserServicesProvider]
})


export class HomePage {

  private userPostList = [];
  private userProfileLists: any;
  private userDisplayfirstname: any
  private userDisplaylastname: any;
  private userEmail: any;
  private userPhoto: any;
  private userId: any; 
  
  public firstname:any;

  postNode: any;
  
  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private navparams: NavParams,
    private usersService: UserServicesProvider, private postsService: PostsServiceProvider,
    public popoverCtrl: PopoverController) {
    this.menuCtrl.enable(true);
  //  console.log(this.navparams.get('emailpass'));
  // alert('hello you are welcome'); 
      var that = this;
     firebase.auth().onAuthStateChanged(function(user) {
     if (user) {  
    that.userId = firebase.auth().currentUser.uid; 
    that.welcomeDisplay(that.userId);
    that.userProfileLists = firebase.database().ref('users'); 
    that.listPost();
     }
   });
 
   this.postNode = firebase.database().ref('posts').orderByChild('Uid'); 
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad(){
    // var userIds = firebase.auth().currentUser.uid;
    //    this.welcomeDisplay(userIds);
  //   var that = this;
  //   firebase.auth().onAuthStateChanged(function(user) {
  //    if (user) {  
  //   var userIds = firebase.auth().currentUser.uid; 
  //   that.welcomeDisplay(userIds);
  //    }
  //  });
   
  }

 
  redirectToSigninPage(){ //redirects to sign pages

    // alert("this is signin page"); 
    this.navCtrl.push(SignPage);
  }

  redirectToSignupPage(){ //redirects to sign pages
    
        // alert("this is signup page"); 
        this.navCtrl.push(SignupPage);
      }
  redirectToUsersProfile(){
      //  alert("this is user page"); 
    this.navCtrl.push(UsersProfilePage);
  } 
  
  welcomeDisplay(UserId){
    var that = this;

    this.usersService.viewUser(UserId).then(snapshot=>{
      that.firstname =(  "Welcome " + (snapshot.val() && snapshot.val().firstname ) ) || 'Anonymous';
      
    });
    
  }

  listPost(){
    // this.postsService.listPostService();
      var that = this;
      // this.postsService.listPostService().then(snapshot =>{
      
      this.postNode.on('value', snapshot =>{

        //empty this array first to avoild duplication of content
        that.userPostList.length = 0;

        snapshot.forEach(function(childSnapshot) {
          // var childKey = childSnapshot.key;
          // var childData = childSnapshot.val();
          // that.userPostList.push(childData);
          var data = childSnapshot.val();
          data['key'] = childSnapshot.key;
          that.userPostList.push(data);

          console.log("post details: " + that.userProfileLists);
          //get the user's detail
          that.postsService.viewUser(that.userId).then(snapshotUser=>{
            that.userDisplayfirstname = snapshotUser.val().firstname;
            that.userDisplaylastname = snapshotUser.val().lastname;
            that.userEmail = snapshotUser.val().email;
            that.userPhoto = snapshotUser.val().photo;

             
                //check the console section of your browser inspect element to see if all
                //informations will display
							  console.log( "user details: "+ snapshotUser.val() );
            
          });
        });
      }); 
  }

}
