import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../service/local.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj:any={
    email:'',
    password:''
  }
  storage=inject(StorageService);
  router=inject(Router);
  OnLogin(){
    if (!this.loginObj.email || !this.loginObj.password) {
      alert('Please enter both email and password.');
      return;
    }
    if(this.loginObj.email==='admin@gmail.com' && this.loginObj.password==='admin'){
      this.storage.setItem('empEmail',this.loginObj.email);
      alert('Login Successful');
      this.router.navigateByUrl('/client');
    } else {
      alert('Invalid Credentials');
      this.loginObj.email='';
      this.loginObj.password='';
    }
  }
}
