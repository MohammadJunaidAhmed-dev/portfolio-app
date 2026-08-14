import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="py-24 relative z-10 bg-slate-950/50">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs uppercase tracking-widest text-cyan-400 font-bold">Tech Expertise</span>
          <h2 class="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mt-2">
            Skills & <span class="gradient-text">Competencies</span>
          </h2>
          <p class="text-slate-400 mt-4 text-sm sm:text-base">
            Mastery of modern frontend frameworks, robust backend APIs, databases, and DevOps.
          </p>
          <div class="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <!-- Category Tabs -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          @for (cat of categories(); track cat) {
            <button 
              (click)="selectedCategory.set(cat)"
              [class]="selectedCategory() === cat 
                ? 'px-5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/25 border-0' 
                : 'px-5 py-2.5 rounded-full text-xs font-semibold glass-panel text-slate-300 hover:text-white border border-slate-700/50'">
              {{ cat }}
            </button>
          }
        </div>

        <!-- Skills Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (skill of filteredSkills(); track skill.id) {
            <div class="glass-panel p-6 glass-panel-hover flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <i class="fa-solid fa-code text-lg"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-white font-heading text-base">{{ skill.name }}</h4>
                      <span class="text-[11px] text-slate-400 uppercase tracking-wider font-medium">{{ skill.category }}</span>
                    </div>
                  </div>
                  <span class="text-xs font-bold text-cyan-400 font-mono">{{ skill.proficiencyPercentage }}%</span>
                </div>

                <!-- Animated Progress Bar -->
                <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
                  <div 
                    class="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-1000"
                    [style.width.%]="skill.proficiencyPercentage">
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60 mt-3">
                <span>Experience</span>
                <span class="text-slate-200 font-medium">{{ skill.yearsOfExperience }}+ Years</span>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class SkillsComponent {
  private skillsSignal = signal<Skill[]>([]);

  @Input() set skills(val: Skill[]) {
    this.skillsSignal.set(val || []);
  }

  selectedCategory = signal<string>('All');

  categories = computed(() => {
    const list = this.skillsSignal();
    const cats = Array.from(new Set(list.map(s => s.category)));
    return ['All', ...cats];
  });

  filteredSkills = computed(() => {
    const cat = this.selectedCategory();
    const list = this.skillsSignal();
    if (cat === 'All') return list;
    return list.filter(s => s.category === cat);
  });
}
