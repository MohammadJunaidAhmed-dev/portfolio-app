import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfo } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-24 relative z-10">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs uppercase tracking-widest text-cyan-400 font-bold">About Me</span>
          <h2 class="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mt-2">
            Engineering Quality <span class="gradient-text">Digital Solutions</span>
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Bio Narrative Card -->
          <div class="lg:col-span-7 glass-panel p-8 sm:p-10 space-y-6">
            <h3 class="text-2xl font-bold text-white font-heading">
              Hi, I'm {{ profile?.fullName || 'M. Junaid Ahmed' }}
            </h3>
            <p class="text-slate-300 leading-relaxed font-light">
              {{ profile?.bio }}
            </p>
            <p class="text-slate-300 leading-relaxed font-light">
              With a strong emphasis on clean code, test-driven development, and modular architectural patterns, I bridge the gap between high-speed backend execution and seamless user interface design.
            </p>

            <!-- Highlights Checklist -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm text-slate-200">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-circle-check text-cyan-400"></i> Scalable Microservices Architecture
              </div>
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-circle-check text-cyan-400"></i> Reactive Angular Standalone SPA
              </div>
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-circle-check text-cyan-400"></i> ASP.NET Core & EF Core SQLite/SQL
              </div>
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-circle-check text-cyan-400"></i> CI/CD, Docker & Cloud Deployment
              </div>
            </div>
          </div>

          <!-- Quick Metrics Cards -->
          <div class="lg:col-span-5 grid grid-cols-2 gap-6">
            <div class="glass-panel p-6 text-center glass-panel-hover">
              <div class="text-4xl font-extrabold gradient-text font-heading">2+</div>
              <div class="text-xs uppercase tracking-wider text-slate-400 mt-2 font-medium">Years Experience</div>
            </div>
            <div class="glass-panel p-6 text-center glass-panel-hover">
              <div class="text-4xl font-extrabold gradient-text font-heading">8+</div>
              <div class="text-xs uppercase tracking-wider text-slate-400 mt-2 font-medium">Projects Completed</div>
            </div>
            <div class="glass-panel p-6 text-center glass-panel-hover">
              <div class="text-4xl font-extrabold gradient-text font-heading">100%</div>
              <div class="text-xs uppercase tracking-wider text-slate-400 mt-2 font-medium">Client Satisfaction</div>
            </div>
            <div class="glass-panel p-6 text-center glass-panel-hover">
              <div class="text-4xl font-extrabold gradient-text font-heading">24/7</div>
              <div class="text-xs uppercase tracking-wider text-slate-400 mt-2 font-medium">Production Reliability</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class AboutComponent {
  @Input() profile: ProfileInfo | null = null;
}
