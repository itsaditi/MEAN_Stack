import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostmessageComponent} from './postmessage/postmessage.component'
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:'', component:RegistrationComponent},
  {path:'registration', component:RegistrationComponent},

  {path:'postmessage', component:PostmessageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
