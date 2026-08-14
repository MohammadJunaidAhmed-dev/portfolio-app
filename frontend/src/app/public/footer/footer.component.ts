import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfo } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="py-12 relative z-10 border-t border-slate-800/80 bg-slate-950">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <!-- Brand -->
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-black text-sm">
            J
          </div>
          <span class="text-sm font-bold text-slate-300 font-heading">
            {{ profile?.fullName || 'M. Junaid Ahmed' }} © {{ currentYear }}
          </span>
        </div>

        <!-- Links -->
        <div class="flex items-center gap-6 text-xs text-slate-400">
          <a href="#about" class="hover:text-cyan-400">About</a>
          <a href="#skills" class="hover:text-cyan-400">Skills</a>
          <a href="#projects" class="hover:text-cyan-400">Projects</a>
          <a href="#experience" class="hover:text-cyan-400">Experience</a>
          <a href="#contact" class="hover:text-cyan-400">Contact</a>
        </div>

        <!-- Back to Top -->
        <a href="#" class="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 text-xs transition-colors">
          <i class="fa-solid fa-arrow-up"></i>
        </a>

      </div>
    </footer>
  `
})
export class FooterComponent {
  @Input() profile: ProfileInfo | null = null;
  currentYear = new Date().getFullYear();
}
