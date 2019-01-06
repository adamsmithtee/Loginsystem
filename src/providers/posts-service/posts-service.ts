import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the PostsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostsServiceProvider {

  private data: any;
  private userNode: any;
  private fireRef: any;
  private postNode: any;
  private userPostNode: any;
  private userId: any;
  private userProfile: any

  private userPostList: any;
  userDisplayfirstname
  userDisplaylastname
  userEmail
  userPhoto
  

  constructor(public http: Http) {
    console.log('Hello PostsServiceProvider Provider');

    this.userNode = firebase.database().ref('users');
    this.postNode = firebase.database().ref('posts'); 
    this.userPostNode = firebase.database().ref('user_post');
    this.fireRef = firebase.database().ref();
  }

  viewPostService(postId:any){
    var userRef = this.postNode.child(postId);
    return userRef.once('value'); 
}
  // view all post made by the particular user
  viewUserPosts(userId: any){
    var userRef = this.userPostNode.child(userId);
    return userRef.once('value');
  }

  listPostService(){
    // return this.postNode.once('value')
    return this.postNode.on('value')

    
  }

  viewUser(userId: any){
    var userRef = this.userNode.child(userId);
    return userRef.once('value');
}

  createPostService(userId: any, postBody: any, firstsname: any, lastname: any,
    month:any, date: any, year: any, hour:any, minutes:any, datetime: any){
      const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const d = new Date();

    //creating a post entry
    var postData = {
      uid: userId,
      body: postBody,
      // photo: userPhoto,
      firstname: firstsname,
      lastName: lastname,
      date: date = d.getDate(),
      month: month =  monthNames[d.getMonth()] ,
      year: year = d.getFullYear(),
      hour: hour = d.getHours(),
      minutes: minutes = d.getMinutes(),
      datetime: d
    };
    //get newkey for a new post
    var newPostKey = this.postNode.push().key;

    //write the new post's data simultsneously in the post list and users post
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user_posts/' + userId + '/' + newPostKey] = postData;
    console.log("new post " + postData);
    return this.fireRef.update(updates);
  }

}
