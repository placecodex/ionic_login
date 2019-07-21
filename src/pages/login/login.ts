import { Component, ViewChild } from '@angular/core';
import { AlertController, App, LoadingController, IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import 'rxjs/add/operator/map';
//import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

const TOKEN_KEY = 'access_token';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  @ViewChild("email") email;
	@ViewChild("password") password;
	public loginForm: any;
	public backgroundImage = './assets/imgs/background.jpg';
	storage: any;

	constructor(
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public app: App,
		public menuCtrl: MenuController, 
        public navParams: NavParams,
        private http: Http
		) {
	}

  //ionViewDidLoad() {
  //  console.log('ionViewDidLoad LoginPage');
	//}
	
	ionViewDidEnter() {
    this.menuCtrl.swipeEnable(false);
	}
	
	ionViewWillLeave() {
    this.menuCtrl.swipeEnable(true);
  }

  Login(){
		if(this.email.value=="" ){
			let alert = this.alertCtrl.create({
				title:"Caution",
				subTitle:"Email must be filled",
				buttons: ['OK']
			});
			alert.present();

		} else if(this.password.value==""){

			let alert = this.alertCtrl.create({
				title:"Caution",
				subTitle:"Password must be filled",
				buttons: ['OK']
			});
			alert.present();

		} else {

			var headers = new Headers();
			//headers.append("Accept", 'application/json');
			headers.append('Content-Type', 'application/json' );
			//headers.append('Origin', 'http://localhost:8100' );
			//headers.append('Access-Control-Allow-Origin', 'application/json' );

			let options = new RequestOptions({ headers: headers });
			let data = {
				email: this.email.value,
				password: this.password.value,
			};

			let loader = this.loadingCtrl.create({
				content: 'Processing please wait…',
			});

			loader.present().then(() => {
				//this.http.post('http://api.3pago.test/api/v1/auth/login',data, options)
				this.http.post('http://localhost/ionlogin/login.php',data, options)
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

						//
						//this.storage.set(TOKEN_KEY, res['token'];

						//var loginJwt = JSON.parse(localStorage.getItem('token')) || [];
						//loginJwt.push(res.token[0]);
						//localStorage.setItem('loginJwt', JSON.stringify(token));

						 localStorage.setItem('token', res['token']);
						
						// create variable to store userdata into localstorage
						var logindata = JSON.parse(localStorage.getItem('userlogin')) || [];

						logindata.push(res.userdata[0]);
						localStorage.setItem('userlogin', JSON.stringify(logindata));
                        // set alert
						alert.present();
						//redirect to home page
						this.navCtrl.setRoot(HomePage);
					} else {
						//else alert bad credentials
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

  toSignup(){
    this.navCtrl.push(
      RegisterPage
    );
  }

  toForgot() {
	this.navCtrl.push(ForgotPasswordPage);
}
}
