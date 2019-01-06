import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, 
  ToastController, LoadingController, PopoverController } from 'ionic-angular';
import { SignPage } from '../sign/sign';
import { HomePage } from '../home/home';
import { UserServicesProvider } from '../../providers/user-services/user-services';
import * as firebase from 'firebase';
// import { SignPageModule } from '../sign/sign.module';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [UserServicesProvider]
})
export class SignupPage {
  public firstname: string;
  public lastname: string;
  public email: any;
  public myDate: string;
  public password: string;
  public confirmPassword: string;
  public phoneNumber: number;
  public gender: string;
  public state: string;
  public city: string;
  // public website: string = 'http://www';
  public website: string ;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
    public toastCtrl: ToastController, public loadingCtrl: LoadingController,
     private usersService: UserServicesProvider) {
  }
 
  // public event = {
  //   month: '1990-02-19',
  //   timeStarts: '07:43',
  //   timeEnds: '1990-02-20'
  // }

  signUpUser(){

    var userAccount  = {
      firstname:this.firstname,
      lastname:this.lastname,
      website:this.website || '',
      phonenumber:this.phoneNumber,
      email:this.email,
      gender:this.gender,
      state:this.state,
      city:this.city,
      dob:this.myDate,
      password:this.password,
      confirmpassword:this.confirmPassword 
    };

    var that = this;

    // document.write(userAccount.Firstname);
    
    if (userAccount['firstname'] && userAccount['phonenumber'] && userAccount['lastname'] && userAccount['email'] && userAccount['gender']&&
      userAccount['dob'] && userAccount['password'] &&
      userAccount['state'] && userAccount['city'] && userAccount['confirmpassword'] != null )
      {
        //password confirmation
     if(this.password != this.confirmPassword) {
      
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'password did not match!',
          buttons: ['OK']
        });
        alert.present();
        this.password = ""//empty the password field
        this.confirmPassword = ""//empty the password field
      }
      else {
      let loading = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'submitting...'
      });
    
      loading.present();
      
      this.usersService.signupUser(userAccount).then(authData=>{
        //successful
        loading.dismiss();
        let alert = this.alertCtrl.create({
            title: 'Successful!',
            subTitle: 'your Account was successfully created!',
            buttons: ['OK']
          });
          alert.present();
            that.navCtrl.setRoot(HomePage);
      }, error => {
        //unable to submit users details
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: error,
          duration: 4000,
        });
        toast.present();
        that.password = ""//empty the password field
        that.confirmPassword = ""//empty the password field
      });
   
     }

  } else{
    let toast = this.toastCtrl.create({
      message: 'one or more field(s) empty!',
      duration: 3000,
      position:'middle'
    });
    toast.present(); 
  } 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
