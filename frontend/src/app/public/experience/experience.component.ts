import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-24 relative z-10 bg-slate-950/50">
      <div class="max-w-5xl mx-auto px-6">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs uppercase tracking-widest text-cyan-400 font-bold">Career & Education</span>
          <h2 class="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mt-2">
            Work <span class="gradient-text">Experience</span>
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <!-- Filter Switch -->
        <div class="flex justify-center mb-12">
          <div class="glass-panel p-1.5 rounded-full inline-flex border border-slate-800">
            <button 
              (click)="selectedType.set('Work')"
              [class]="selectedType() === 'Work'
                ? 'px-6 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md'
                : 'px-6 py-2 rounded-full text-xs font-medium text-slate-400 hover:text-white'">
              <i class="fa-solid fa-briefcase mr-2"></i> Work History
            </button>
            <button 
              (click)="selectedType.set('Education')"
              [class]="selectedType() === 'Education'
                ? 'px-6 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md'
                : 'px-6 py-2 rounded-full text-xs font-medium text-slate-400 hover:text-white'">
              <i class="fa-solid fa-graduation-cap mr-2"></i> Education
            </button>
          </div>
        </div>

        <!-- Vertical Timeline -->
        <div class="relative border-l-2 border-slate-800 ml-4 sm:ml-32 space-y-12 pl-6 sm:pl-10">
          @for (item of filteredExperiences(); track item.id) {
            <div class="relative group">
              
              <!-- Timeline Dot -->
              <div class="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center text-[10px] text-cyan-400 group-hover:scale-125 transition-transform shadow-lg shadow-cyan-500/20">
                <i class="fa-solid" [ngClass]="item.type === 'Work' ? 'fa-briefcase' : 'fa-graduation-cap'"></i>
              </div>

              <!-- Date Badge (Desktop Left side positioning emulation) -->
              <div class="sm:absolute sm:-left-36 sm:top-1.5 mb-2 sm:mb-0 text-xs font-semibold text-cyan-400 font-mono">
                {{ item.period }}
              </div>

              <!-- Main Card -->
              <div class="glass-panel p-6 sm:p-8 glass-panel-hover">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 class="text-xl font-bold text-white font-heading">{{ item.title }}</h3>
                    <div class="text-sm font-medium text-slate-300 flex items-center gap-2 mt-0.5">
                      <span>{{ item.company }}</span>
                      <span class="text-slate-600">•</span>
                      <span class="text-slate-400 text-xs"><i class="fa-solid fa-location-dot mr-1"></i>{{ item.location }}</span>
                    </div>
                  </div>
                  @if (item.isCurrent) {
                    <span class="inline-flex text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full self-start">
                      Current Role
                    </span>
                  }
                </div>

                <p class="text-slate-300 text-sm font-light leading-relaxed">
                  {{ item.description }}
                </p>
              </div>

            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class ExperienceComponent {
  private experiencesSignal = signal<Experience[]>([]);

  @Input() set experiences(val: Experience[]) {
    this.experiencesSignal.set(val || []);
  }

  selectedType = signal<'Work' | 'Education'>('Work');

  filteredExperiences = computed(() => {
    const type = this.selectedType();
    const list = this.experiencesSignal();
    return list.filter(e => e.type === type);
  });
}
