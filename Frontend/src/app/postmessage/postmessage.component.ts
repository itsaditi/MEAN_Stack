import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-postmessage',
  templateUrl: './postmessage.component.html',
  styleUrls: ['./postmessage.component.css']
})
export class PostmessageComponent implements OnInit {
  jsondata:any;
  username:any;
  constructor(private http: HttpClient,private route: ActivatedRoute,private router: Router) {
   }

  ngOnInit() {
    this.getMessages();
    if (this.username!=''){
      
    }
    else{
      this.router.navigate(['']);

    }
    // alert(this.username)
  }
  
  // ngDoCheck() 
  // {
  //   this.getMessages();
  // }
  onSubmit(f:NgForm){
    this.username = localStorage.getItem("Username")
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    this.http.post('http://localhost:5000/api/message/'+this.username, f.value).subscribe(data=>{
      // alert(data)
      this.getMessages();
      f.resetForm()

    });
  }

  getMessages(){
    this.username = localStorage.getItem("Username")
    this.http.get('http://localhost:5000/api/getmessages/'+this.username).subscribe(data=>{
      console.log(data)
      this.jsondata = data
    })
  }

  logout(){
    localStorage.removeItem("Username")
    this.router.navigate(['registration'])
  }

}
