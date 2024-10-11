import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { Router } from '@angular/router';  

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule]  
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}  

  onSubmit() {
    console.log('Intentando iniciar sesión con:');
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);

    this.router.navigate(['/categoria']); 
  }
}
