import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ToastController, ActionSheetController,
ModalController, ViewController, LoadingController, Loading } from 'ionic-angular';
import { UserServicesProvider } from '../../providers/user-services/user-services';
import { ImageServiceProvider } from '../../providers/image-service/image-service';
// import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { ModalcontentPage } from '../modalcontent/modalcontent';
import * as firebase from 'firebase';
import { SMS } from '@ionic-native/sms';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ProfileDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()



@Component({
  selector: 'page-profile-details',
  templateUrl: 'profile-details.html',
  providers: [UserServicesProvider, ImageServiceProvider]
})
export class ProfileDetailsPage {
  private userImageUrl:any;
  private firstname: any;
  private lastname: any;
  private email: any;
  private phonenumber: any;
  private username: any;
  private website: any;

  public image: any;
  public pixRef: any
  userProfile: any;
  userId: any;
  loading: Loading;
  myphotoUrl: any;



  constructor(public navCtrl: NavController, public toastCtrl:ToastController, public navParams: NavParams,
     private usersService: UserServicesProvider, private sms: SMS, private socialSharing: SocialSharing,
     public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController,
     private imageService: ImageServiceProvider, private CAMERA : Camera,
    public loadingCtrl: LoadingController) {
    //current user id
    this.userId = firebase.auth().currentUser.uid;
    this.displayUser(this.userId);
    this.userProfile = firebase.database().ref('users');
    // photoRef = firebase.database().ref('users'/ this.userId / );

    // this.image = 'pix-' + new Date().getTime() + '.jpg',
    this.image = 'pix-' + Math.floor(Date.now() / 1000) + '.jpg',
    this.pixRef = firebase.storage().ref('profile_pictures/' + this.image);

    // this.changeProfilePix();
    
  }

  openModal() {
    var data ={messgae: 'hello world'}
    let modal = this.modalCtrl.create(ModalcontentPage, data);
    modal.present();
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileDetailsPage');
  }
  
  displayUser(UserId){
    var that = this;

    this.usersService.viewUser(UserId).then(snapshot=>{
      //get the user photo
      that.userImageUrl = snapshot.val().profilePicURL;//.photo id the name of photo in the database
      that.firstname = (snapshot.val() && snapshot.val().firstname ) || 'Anonymous';
      that.lastname =  snapshot.val().lastname;      
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
    })
    
  }

  generalShare(){
    //this will open share
    this.socialSharing.share('HELLO wORLD', null, null,null);
    
  }

  launchSms(){
    // alert('sms alert');
  // Send a text message using default options
  this.sms.send('416123456', 'Hello world!',  );
  }

  launchMail(){
      // Check if sharing via email is supported
      this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
    }).catch(() => {
      alert ('Sharing via email is not possible');
    });

    // Share via email
    this.socialSharing.shareViaEmail('hello world', 'just texting', ['recipient@example.org']).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  facebookShare(){
    this.socialSharing.shareViaFacebook('Hello world', null, null)
  }

  whatsappShare(){
    //whatsapp sharing
    this.socialSharing.shareViaWhatsApp('Hello world', null, null)
    
  }

  twitterShare(){
    this.socialSharing.shareViaTwitter('Hello world', null, null)
  }

  // create options for choosing image
  clickToChangePix(): any {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image from',
      buttons: [
        {
          text: 'Choose from Gallery',
          handler: () => {
            console.log('gallery clicked');
            this.selectImage(this.CAMERA.PictureSourceType.PHOTOLIBRARY);
          }
        },{
          text: 'Use Camera',
          handler: () => {
            console.log('camera clicked');
            this.selectImage(this.CAMERA.PictureSourceType.CAMERA);

          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  uploadImage(){
    let parseUpload : any;
  }

  changeProfilePix(){
    this.clickToChangePix().then(profilePix=>{
      // send the pix to firebase storage
      const selfRef =  this.pixRef;
      selfRef.putString(profilePix, 'base64', {contentType: 'image/jpg'})
      .then(savedPix=>{
        this.pixRef.set(savedPix.downloadURL); 
      }, error=>{
        console.log(error)
      })
    }, error=>{
    
      // Log an error to the console if something goes wrong.
    console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  
  selectImage(sourceType) {
    let cameraOptions : CameraOptions = {
        sourceType         : sourceType,
        destinationType    : this.CAMERA.DestinationType.DATA_URL,
        allowEdit          : true,
        quality            : 100,
        targetWidth        : 320,
        targetHeight       : 240,
        encodingType       : this.CAMERA.EncodingType.JPEG,
        correctOrientation : true
    };
   
   return this.CAMERA.getPicture(cameraOptions)
   .then(profilePic=>{
    
    // this.loadingcontrol();
    // send the pix to firebase storage
 
    const selfRef =  this.pixRef;
    selfRef.putString(profilePic, 'base64', {contentType: 'image/jpg'})
    .then(savedPix=>{ 
     // creating the database reference to add to our database
      // this.loading.dismiss();
      // this.toastcontrol();
      this.userProfile.child(this.userId)
      .update({profilePicURL: savedPix.downloadURL}).then(()=>{
        //show a toast message that the profile pix was updated.
        this.toastcontrol();
      }, error=>{
        this.toastError(error);
      }); 
       // clear the previous photo data in the variable
      profilePic = "";
    }, error=>{
      console.log(error)
    })
  }, error=>{
    //output the error msg to the user in toast form
    this.toastError(error);
  
    // Log an error to the console if something goes wrong.
  console.log("ERROR -> " + JSON.stringify(error));
  });
   
}


loadingcontrol(){
  let loading = this.loadingCtrl.create({
    spinner: 'circles',
    content: 'uploading...'
  });

  loading.present();
}

toastcontrol(){
  let toast = this.toastCtrl.create({
    message: 'profile picture updated',
    duration: 2000,
    position: 'bottom'
  });
  toast.present();
}

toastError(text){
  let toast = this.toastCtrl.create({
    message: text,
    duration: 2000,
    position: 'bottom'
  });
  toast.present();
}


}

/*@Component({
  template:`
  <ion-header>

  <ion-navbar>
    <ion-title>{{tittle}}</ion-title>

    <ion-buttons start>
        <button ion-button icon-only (click)="dismiss()">
          <span ion-text color="primary" showWhen="ios">Cancel</span>
          <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
        </button>
      </ion-buttons>
  </ion-navbar>
  
</ion-header>


<ion-content padding>
<h2> {{character.name}} </h2>
<!-- <h2> {{names}} </h2> -->

</ion-content>

  `
})

export class ModalcontentPage {
  character;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController,
    public toastCtrl: ToastController, private usersService: UserServicesProvider) {
   
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

     dismiss() {
          this.viewCtrl.dismiss();
        }
}*/