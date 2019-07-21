import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {


  public items : any = [];
  public names: any; // var
  viewCtrl: any;
  data: { viewCtrl: any; };
  

  constructor(
    
     public navCtrl: NavController,
     public navParams: NavParams,
     public http: Http
     
     ) { // start  construct

      this.list_item();


    } // end constructor

  // get items
   list_item()
   {
      this.http.get('http://localhost/ionlogin/list.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.items = data;
      });
   }// end function

   public onClickCancel() {
    this.data = {
      viewCtrl: this.viewCtrl
    }
  }

   
  
}// end class list
