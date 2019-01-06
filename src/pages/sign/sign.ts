import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, 
  AlertController, MenuController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { UserServicesProvider } from '../../providers/user-services/user-services';
import * as firebase from 'firebase';

/**
 * Generated class for the SignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html',
  providers: [UserServicesProvider]
})
export class SignPage {
  public email: any;
  public password: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
  public toastCtrl: ToastController, private usersService: UserServicesProvider, 
  public alertCtrl:AlertController, public menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignPage');
  }

  redirectToSignupPage(){ //redirects to sign pages
  
        this.navCtrl.push(SignupPage);
      }
  
      submitLogin(){//function for loging in
        
        var that = this;
        let loading = this.loadingCtrl.create({
          spinner: 'circles',
          content: 'signing in...'
        });
      
        loading.present();
        
        this.usersService.loginUser(this.email, this.password).then(authData =>{
          //sucessful
          loading.dismiss();
          that.navCtrl.setRoot(HomePage,{ emailpass: this.email});
        }, error => {
          loading.dismiss();
          //error loging in
          let toast = this.toastCtrl.create({
            message: error,
            duration: 4000,
            position: 'middle'
          });
          toast.present();

          that.password = "" // i.e empty the password field
        });
      }

      resetPassword(){
        //function for reseting password
        let prompt = this.alertCtrl.create({
          title: 'Enter your Email',
          message: "A new password will be sent to your email",
          inputs: [
            {
              name: 'recoveryemail',
              placeholder: 'youremail@example.com'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Submit',
              handler: data => {
                // console.log('the email entered is' + data.recoveryemail);
                // call userService function

                let loading = this.loadingCtrl.create({
                  spinner: 'circles',
                  content: 'sending...'
                });
              //loader present while connecting to server
                loading.present();
                this.usersService.forgotpassword(data.recoveryemail).then(()=>{
                  loading.dismiss();
                  let toast = this.toastCtrl.create({
                    message: 'New password sent',
                    duration: 4000,
                    position: 'middle'
                  });
                  toast.present();

                  // if there is an error
                }, error=>{
                  loading.dismiss();
                  let toast = this.toastCtrl.create({
                    message: error,
                    duration: 4000,
                    position: 'middle'
                  });
                  toast.present();
                });
              }
            }
          ]
        });
        prompt.present();
      }

      signinWithGoogle(){
        //function for loging in with google
        this.usersService.googleSigninUser().then(()=>{
          let toast = this.toastCtrl.create({
            message: 'successful',
            duration: 4000,
            position: 'middle'
          });
          toast.present();
        }, error=>{
          let toast = this.toastCtrl.create({
            message: error,
            duration: 4000,
            position: 'middle'
          });
          toast.present();
        })
      }
      signinWithFacebook(){
        //function for signing in with facebook
      }

 
}
