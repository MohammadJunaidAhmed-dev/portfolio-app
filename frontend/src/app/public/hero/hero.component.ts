import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfo } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <!-- Background Ambient Glow Orbs -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div class="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Left Hero Text Content -->
        <div class="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          
          <!-- Status Badge -->
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-xs font-medium text-cyan-300">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            {{ profile?.availableForHire ? 'Available for new projects & roles' : 'Currently working on high-impact systems' }}
          </div>

          <!-- Headline -->
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight leading-[1.1]">
            Building <span class="gradient-text">High-Performance</span> Web Platforms & APIs.
          </h1>

          <!-- Subtitle / Bio summary -->
          <p class="text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
            I'm <strong class="text-white font-semibold">{{ profile?.fullName || 'M. Junaid Ahmed' }}</strong> — {{ profile?.title || 'Full-Stack Engineer' }}. I design and build resilient backend APIs with <span class="text-cyan-400 font-medium">.NET 8</span> and modern single-page applications with <span class="text-indigo-400 font-medium">Angular</span>.
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center gap-4 pt-2">
            <a href="#projects" class="btn-primary">
              View Work Showcase <i class="fa-solid fa-arrow-down"></i>
            </a>
            <a [href]="profile?.resumeUrl || '#'" target="_blank" class="btn-secondary">
              <i class="fa-solid fa-file-arrow-down text-cyan-400"></i> Download CV
            </a>
          </div>

          <!-- Social Links -->
          <div class="flex items-center gap-4 pt-4 text-slate-400">
            <span class="text-xs uppercase tracking-widest text-slate-500 font-semibold">Connect:</span>
            <a [href]="profile?.gitHubUrl" target="_blank" class="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:text-cyan-400 hover:border-cyan-500/40 transition-colors">
              <i class="fa-brands fa-github"></i>
            </a>
            <a [href]="profile?.linkedInUrl" target="_blank" class="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:text-cyan-400 hover:border-cyan-500/40 transition-colors">
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
            <a [href]="profile?.twitterUrl" target="_blank" class="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:text-cyan-400 hover:border-cyan-500/40 transition-colors">
              <i class="fa-brands fa-x-twitter"></i>
            </a>
          </div>

        </div>

        <!-- Right Avatar & Dynamic Graphic Card -->
        <div class="lg:col-span-5 flex justify-center relative">
          <div class="relative w-72 h-72 sm:w-96 sm:h-96 rounded-3xl overflow-hidden glass-panel p-3 border-2 border-cyan-500/20 shadow-2xl shadow-cyan-500/10 animate-float">
            <img [src]="profile?.avatarUrl" [alt]="profile?.fullName" class="w-full h-full object-cover rounded-2xl filter contrast-105 brightness-95">
            
            <!-- Tech Floating Pills -->
            <div class="absolute top-6 -left-4 glass-panel py-2 px-4 rounded-xl border border-cyan-500/30 text-xs font-semibold text-cyan-300 flex items-center gap-2 shadow-xl">
              <i class="fa-brands fa-angular text-red-500 text-lg"></i> Angular Specialist
            </div>

            <div class="absolute bottom-6 -right-4 glass-panel py-2 px-4 rounded-xl border border-indigo-500/30 text-xs font-semibold text-indigo-300 flex items-center gap-2 shadow-xl">
              <i class="fa-solid fa-code text-purple-400 text-lg"></i> .NET 8 / 9 Web API
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  @Input() profile: ProfileInfo | null = null;
}
