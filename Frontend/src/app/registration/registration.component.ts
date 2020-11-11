import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  errormessage:any= false;
  loginresult:any;
  registerres:any;
  constructor(private http:HttpClient, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
  }

  OnLogin(loginform:NgForm){

    this.http.post('http://localhost:5000/api/login', loginform.value).subscribe(resp=>{
      console.log(resp)
      this.loginresult=JSON.stringify(resp["message"]);
      if(resp["message"]=="Login Successful !"){
        localStorage.setItem("Username",loginform.value["emailid"] )
        this.router.navigate(['postmessage']);


      }
    })
  }

  Onregister(RegisterForm:NgForm){
    var register;
    register= RegisterForm.value
    if(register["createpassword"]!=register["password"]){
      this.errormessage = true;
      RegisterForm.resetForm()
    }
    else{
      this.errormessage = false;
      this.http.post('http://localhost:5000/api/register', RegisterForm.value).subscribe(resp=>{
      this.registerres=resp["message"];
      RegisterForm.resetForm()
    })
    }
  }

}
