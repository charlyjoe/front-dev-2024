import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../modules/product/_service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.loading = false;
        console.log(response);
        //this.router.navigate(['/categoria']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error en el login', error);
      },
    });
  }
}
