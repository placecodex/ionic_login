import { Component, ViewChild } from '@angular/core';
import { AlertController, App, LoadingController, IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
//import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { LoginPage } from '../login/login';




/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})

export class ForgotPasswordPage {

  @ViewChild("email") email;
  seeTabs: boolean = false;

	//public loginForm: any;
	//public backgroundImage = './assets/imgs/background.jpg';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
   	public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public app: App,
		public menuCtrl: MenuController, 
    private http: Http
     
     ) {

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  Forgot(){
    // if input email empty show alert
    if(this.email.value=="" ){
			let alert = this.alertCtrl.create({
				title:"Caution",
				subTitle:"Email must be filled",
				buttons: ['OK']
			});
			alert.present();
     //else input not empty
		}else{

     // set headers
			var headers = new Headers();
			//headers.append("Accept", 'application/json');
			headers.append('Content-Type', 'application/json' );
			//headers.append('Origin', 'http://localhost:8100' );
			//headers.append('Access-Control-Allow-Origin', 'application/json' );

			let options = new RequestOptions({ headers: headers });
			let data = {
				email: this.email.value,
				//password: this.password.value,
			};
      // show load mensaje
			let loader = this.loadingCtrl.create({
				content: 'Processing please wait…',
			});

			loader.present().then(() => {
        // url request
		//this.http.post('http://ap',data, options)
		this.http.post('http://localhost/ionlogin/forgot-password.php',data, options)
        
				.map(res => res.json())
				.subscribe(res => {

          loader.dismiss()
          
					if(res['status']=="true"){
						// console.log(res.userdata[0]);
						let alert = this.alertCtrl.create({
							title:"Alert",
							subTitle:('You have logged in!'),
							buttons: ['OK']
            });
            // if authentication is true make action

					// create variable to store userdata into localstorage
					//	var logindata = JSON.parse(localStorage.getItem('userlogin')) || [];
					//logindata.push(res.userdata[0]);
          //localStorage.setItem('userlogin', JSON.stringify(logindata));
					//	alert.present();
					//	this.navCtrl.setRoot(HomePage);
					} else {

            //else authentication is not true, show alert with error 
						let alert = this.alertCtrl.create({
							title:"ERROR",
							subTitle:(res.message),
							buttons: ['OK']
						});
						alert.present();
					}
				});
			});



    } 
		


  }

  
	toLogin() {
		this.navCtrl.push(LoginPage);
  }
  
  
	toForgot() {
		this.navCtrl.push(ForgotPasswordPage);
	}

}
