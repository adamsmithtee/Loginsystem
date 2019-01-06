import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ToastController } from 'ionic-angular';
import { UserServicesProvider } from '../../providers/user-services/user-services';
import * as firebase from 'firebase';


/**
 * Generated class for the ModalcontentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modalcontent',
  templateUrl: 'modalcontent.html',
  providers: [UserServicesProvider]
})
export class ModalcontentPage {
  public character: any;
  public email:any;
  public phonenumber: any;
  public website: any;
  public names: any;
  public userId: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController,
 public toastCtrl: ToastController, private usersService: UserServicesProvider) {
  // alert( this.navParams.get('messgae'))
  this.names = this.navParams.get('messgae');
  console.log("the answer is " + this.names);
  // this.names= this.navParams.get(this.email);
  
    // var userId = firebase.auth().currentUser.uid;
    //  this.displayUser(userId);

     this.userId = firebase.auth().currentUser.uid;
    


     var that = this;
     this.usersService.viewUser(this.userId).then(snapshot=>{
       that.email = snapshot.val().email;
       that.phonenumber = snapshot.val().phonenumber;
       that.website = snapshot.val().website;
 
     }, error=>{
       let toast = this.toastCtrl.create({
         message: error,
         duration: 4000,
         position: 'middle'
       });
       toast.present();
     });


    //  let names: any = this.navParams.get(this.email);
  // console.log("names....= "+ names);
    var characters = [
      {
        name: 'this.email' ,
        tittle: 'Edit email'
      },
      {
        name: 'this.phonenumber'
      },
      {
        name:' this.websit' 
      }
    ];
    console.log(JSON.stringify(characters));
    console.log('gettin them... '+ characters)
    this.character = characters[this.navParams.get('charNum')];


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalcontentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

 
  // displayUser(UserId){
  //   var that = this;
  //   this.usersService.viewUser(UserId).then(snapshot=>{
  //     that.email = snapshot.val().email;
  //     that.phonenumber = snapshot.val().phonenumber;
  //     that.website = snapshot.val().website;

  //   }, error=>{
  //     let toast = this.toastCtrl.create({
  //       message: error,
  //       duration: 4000,
  //       position: 'middle'
  //     });
  //     toast.present();
  //   })
    
  // }
}
