import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      
      <!-- Background Ambient Glow -->
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div class="w-full max-w-md glass-panel p-8 sm:p-10 border border-slate-800 relative z-10">
        
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-lg shadow-cyan-500/20 mb-4">
            J
          </div>
          <h2 class="text-2xl font-bold text-white font-heading">Admin Portal Login</h2>
          <p class="text-xs text-slate-400 mt-1">Authenticate to manage portfolio content</p>
        </div>

        @if (errorMessage()) {
          <div class="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex items-center gap-3">
            <i class="fa-solid fa-triangle-exclamation text-base shrink-0"></i>
            <span>{{ errorMessage() }}</span>
          </div>
        }

        <form (ngSubmit)="onLogin()" #loginForm="ngForm" class="space-y-6">
          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Username</label>
            <div class="relative">
              <i class="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input 
                type="text" 
                name="username" 
                [(ngModel)]="credentials.username" 
                required 
                placeholder="Admin username" 
                class="form-input pl-10">
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Password</label>
            <div class="relative">
              <i class="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input 
                type="password" 
                name="password" 
                [(ngModel)]="credentials.password" 
                required 
                placeholder="••••••••" 
                class="form-input pl-10">
            </div>
          </div>

          <button 
            type="submit" 
            [disabled]="isLoading() || !loginForm.form.valid" 
            class="btn-primary w-full justify-center py-3.5 text-sm disabled:opacity-50">
            @if (isLoading()) {
              <i class="fa-solid fa-spinner animate-spin"></i> Authenticating...
            } @else {
              Sign In to Dashboard <i class="fa-solid fa-right-to-bracket"></i>
            }
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-slate-800 text-center">
          <a href="/" class="text-xs text-slate-400 hover:text-cyan-400 transition-colors">
            <i class="fa-solid fa-arrow-left mr-1"></i> Back to Public Portfolio
          </a>
        </div>

      </div>
    </div>
  `
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  credentials = {
    username: 'admin',
    password: ''
  };

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  onLogin() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.isLoading.set(false);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Invalid username or password.');
      }
    });
  }
}
