import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  hide: boolean = true;
  Message: string = ''
  signinForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  })

  constructor(private _authServices: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }


  onSubmit(data: FormGroup) {
    this._authServices.onSignin(data.value).subscribe({
      next: (res:any) => {
        localStorage.setItem('userToken', res.data.token)
        localStorage.setItem('role',res.data.user.role)
        localStorage.setItem('userName',res.data.user.userName)
        localStorage.setItem('email',res.data.user.email)
        localStorage.setItem('userId',res.data.user._id)


      }, error: (err) => {
        this.toastr.error(err.error.message, 'Error!')
      }, complete: () => {
        if(localStorage.getItem('role')=='admin'){
          this.router.navigate(['/dashboard'])
         }
         else{
          this.router.navigate(['/landingPage/home']);
         }

        this.toastr.success('Logged In', 'Successfully')
      }
    })
  }

}
