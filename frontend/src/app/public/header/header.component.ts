import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300 px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Logo -->
        <a href="#" class="flex items-center gap-3 text-decoration-none group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            J
          </div>
          <span class="text-xl font-bold tracking-tight text-white font-heading">
            Junaid<span class="text-cyan-400">.dev</span>
          </span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#about" class="hover:text-cyan-400 transition-colors">About</a>
          <a href="#skills" class="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#projects" class="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#experience" class="hover:text-cyan-400 transition-colors">Experience</a>
          <a href="#contact" class="hover:text-cyan-400 transition-colors">Contact</a>
        </nav>

        <!-- Right Action Controls -->
        <div class="hidden md:flex items-center gap-4">
          @if (authService.isAuthenticated()) {
            <a routerLink="/admin" class="btn-secondary text-xs py-2 px-4">
              <i class="fa-solid fa-gauge-high text-cyan-400"></i> Admin Panel
            </a>
            <button (click)="authService.logout()" class="text-slate-400 hover:text-rose-400 text-xs px-2 py-1">
              Logout
            </button>
          } @else {
            <a routerLink="/admin/login" class="text-slate-400 hover:text-cyan-400 text-xs flex items-center gap-1">
              <i class="fa-solid fa-lock text-[10px]"></i> Admin Portal
            </a>
          }
          <a href="#contact" class="btn-primary text-xs py-2 px-5">
            Hire Me <i class="fa-solid fa-paper-plane text-[10px]"></i>
          </a>
        </div>

        <!-- Mobile Menu Trigger -->
        <button (click)="mobileMenuOpen.set(!mobileMenuOpen())" class="md:hidden text-slate-300 hover:text-white p-2">
          <i class="fa-solid" [ngClass]="mobileMenuOpen() ? 'fa-xmark' : 'fa-bars-staggered'"></i>
        </button>
      </div>

      <!-- Mobile Dropdown -->
      @if (mobileMenuOpen()) {
        <div class="md:hidden glass-panel mt-4 p-6 flex flex-col gap-4 text-center">
          <a href="#about" (click)="mobileMenuOpen.set(false)" class="hover:text-cyan-400 py-2">About</a>
          <a href="#skills" (click)="mobileMenuOpen.set(false)" class="hover:text-cyan-400 py-2">Skills</a>
          <a href="#projects" (click)="mobileMenuOpen.set(false)" class="hover:text-cyan-400 py-2">Projects</a>
          <a href="#experience" (click)="mobileMenuOpen.set(false)" class="hover:text-cyan-400 py-2">Experience</a>
          <a href="#contact" (click)="mobileMenuOpen.set(false)" class="hover:text-cyan-400 py-2">Contact</a>
          <div class="pt-2 border-t border-slate-800 flex justify-center gap-3">
            <a routerLink="/admin" class="btn-secondary text-xs">Admin Panel</a>
          </div>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  authService = inject(AuthService);
  mobileMenuOpen = signal(false);
}
