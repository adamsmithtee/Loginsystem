import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { PostsServiceProvider } from '../../providers/posts-service/posts-service';
import * as firebase from 'firebase';


/**
 * Generated class for the AddPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
  providers: [PostsServiceProvider]
  
})
export class AddPostPage {
private PostTitle: any;
private postBody: any;
private userId: any;

private firstname: any;
private lastname: any;
private year: any;
private date: any;
private month: any;
private hour: any;
private minutes: any;
datetime: any;




  constructor(public navCtrl: NavController, public navParams: NavParams, 
  private toastCtrl:ToastController, private postsService: PostsServiceProvider,
  private loadingCtrl: LoadingController) {
   
  this.userId = firebase.auth().currentUser.uid; //user id of current logged in user
    
    var that = this;
        this.postsService.viewUser(this.userId).then(snapshot=>{
          that.firstname = (snapshot.val() && snapshot.val().firstname ) || 'Anonymous';
          that.lastname = snapshot.val().lastname; 
          
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPostPage');
  }

  addNewPost(){

    let loading = this.loadingCtrl.create({
      content: 'please wait...'
    });
  
    loading.present();
    this.postsService.createPostService(this.userId, this.postBody, this.firstname, this.lastname,
    this.year, this.date, this.month, this.hour, this.minutes, this.datetime
  ).then(()=>{

      //clear the postbody
      this.postBody = "";
      //dismiss loader
      loading.dismiss();
      //show a toast of post added
      let toast = this.toastCtrl.create({
        message: 'post added',
        duration: 2000,
        position: 'middle'
      });
      toast.present();

      this.navCtrl.pop();

    }, error=>{
      loading.dismiss();
      // show a toast of an error in adding post
      let toast = this.toastCtrl.create({
        message: error,
        duration: 4000,
        position: 'middle'
      });
      toast.present();
    })
  }
}
