import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController, ViewController } from 'ionic-angular';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

// import { Observable } from 'rxjs/Observable';
import {Http, Headers} from '@angular/http'; 
// import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the UserServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServicesProvider {

private data: any;
public fireAuth: any;
public userProfile: any;

  constructor(public http: Http, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
     public alertCtrl: AlertController, public navCtrl: NavController,
    public viewCtrl: ViewController ) {
    console.log('Hello UserServicesProvider Provider');

    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('users')
  }


  loadUser(number) {
    
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      // duration: 3000
    });
    loader.present();

    if(this.data){
      return Promise.resolve(this.data);
    }
 
    return new Promise (resolve => {
      
      this.http.get('https://randomuser.me/api/?results=' + number)
        .map(res => res.json())
        // .map(res => res.results as Order[] || []);
        // .map((res: Response) => res.json())
        .subscribe(data => {
          this.data = data.results;
          resolve(this.data);
          loader.dismiss();
         
        },  error =>{
            loader.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'No Internet Connection',
            buttons: ['Dismiss']
          
          });
          
          alert.present();
          this.navCtrl.pop();
          // this.viewCtrl.dismiss();
        })
    });
  }
 
   
  // loadUser(number){
  //   return this.http.get('https://randomuser.me/api/?results=' + number)
  // }

  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signupUser(userAccount: {}){

    // console.log("email here "+userAccount);
    console.log(JSON.stringify(userAccount));
    return this.fireAuth.createUserWithEmailAndPassword(userAccount['email'],
     userAccount['password']).then((newUser) =>{
          
      //sign in the user immediately
          this.fireAuth.signInWithEmailAndPassword(userAccount['email'], userAccount['password']).then((authenticatedUser)=>{
          //successful login, create user

          
          this.userProfile.child(authenticatedUser.uid).set(userAccount) ;
      });
    });

  }
forgotpassword(email:any){
return this.fireAuth.sendPasswordResetEmail(email);
}

googleSigninUser(){
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
 
  var that = this;
  return firebase.auth().signInWithPopup(provider).then(function(result) {
    //could also be written as
    // return firebase.auth().signInWithPopup(provider).then((result)=> {
    if(result.user){

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

   /* var res = result.user.displayName.split(" ");

    that.userProfile.child(user.uid).set({
        email: user.email,
        photo: user.photoURL,
        username: user.displayName,
        name: {
          first: res[0],
          middle: res[1],
          last: res[2],
        },
    });
    // ...
    }*/

       var res = result.user.displayName.split(" ");

    that.userProfile.child(user.uid).set({
        email: user.email,
        photo: user.photoURL,
        username: user.displayName,
        firstname: user.first,
        lastname: user.last,
        gender: user.gender
    });
    // ...
    }

  }).catch((error)=> {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

viewUser(userId: any){
    var userRef = this.userProfile.child(userId);
    return userRef.once('value');
}




}