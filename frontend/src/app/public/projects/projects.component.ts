import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="projects" class="py-24 relative z-10">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs uppercase tracking-widest text-cyan-400 font-bold">Portfolio Showcase</span>
          <h2 class="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mt-2">
            Featured <span class="gradient-text">Projects & Work</span>
          </h2>
          <p class="text-slate-400 mt-4 text-sm sm:text-base">
            Explore production applications, open-source projects, and full-stack solutions.
          </p>
          <div class="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <!-- Filter Controls & Search -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          
          <!-- Filter Tabs -->
          <div class="flex flex-wrap gap-2">
            @for (cat of categories(); track cat) {
              <button 
                (click)="selectedCategory.set(cat)"
                [class]="selectedCategory() === cat 
                  ? 'px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' 
                  : 'px-4 py-2 rounded-xl text-xs font-semibold glass-panel text-slate-300 hover:text-white border border-slate-700/50'">
                {{ cat }}
              </button>
            }
          </div>

          <!-- Search Input -->
          <div class="relative w-full sm:w-72">
            <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input 
              type="text" 
              [(ngModel)]="searchQuery" 
              placeholder="Search projects or tech stack..." 
              class="form-input pl-10 py-2 text-xs">
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (project of filteredProjects(); track project.id) {
            <div class="glass-panel overflow-hidden glass-panel-hover flex flex-col group border border-slate-800">
              
              <!-- Image Banner -->
              <div class="relative h-52 overflow-hidden bg-slate-900">
                <img 
                  [src]="project.imageUrl" 
                  [alt]="project.title" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                @if (project.featured) {
                  <span class="absolute top-4 right-4 bg-indigo-500/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Featured
                  </span>
                }
                
                <span class="absolute bottom-4 left-4 text-xs font-semibold text-cyan-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-cyan-500/30">
                  {{ project.category }}
                </span>
              </div>

              <!-- Content Body -->
              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="text-xl font-bold text-white font-heading group-hover:text-cyan-400 transition-colors">
                    {{ project.title }}
                  </h3>
                  <p class="text-slate-300 text-sm mt-3 line-clamp-2 font-light">
                    {{ project.shortSummary || project.description }}
                  </p>

                  <!-- Tech Tags -->
                  <div class="flex flex-wrap gap-2 mt-4">
                    @for (tag of project.parsedTags; track tag) {
                      <span class="tech-badge text-[11px]">{{ tag }}</span>
                    }
                  </div>
                </div>

                <!-- Footer Action Links -->
                <div class="flex items-center justify-between pt-6 border-t border-slate-800/80 mt-6 text-xs font-semibold">
                  <button (click)="openModal(project)" class="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5">
                    Details <i class="fa-solid fa-arrow-right text-[10px]"></i>
                  </button>
                  <div class="flex items-center gap-3">
                    @if (project.gitHubUrl) {
                      <a [href]="project.gitHubUrl" target="_blank" class="text-slate-400 hover:text-white text-base">
                        <i class="fa-brands fa-github"></i>
                      </a>
                    }
                    @if (project.liveDemoUrl) {
                      <a [href]="project.liveDemoUrl" target="_blank" class="text-cyan-400 hover:text-cyan-300 text-base">
                        <i class="fa-solid fa-up-right-from-square"></i>
                      </a>
                    }
                  </div>
                </div>

              </div>

            </div>
          }
        </div>

      </div>

      <!-- Detail Modal -->
      @if (activeModalProject()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div class="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-slate-700 relative animate-float">
            
            <button (click)="closeModal()" class="absolute top-6 right-6 text-slate-400 hover:text-white text-xl">
              <i class="fa-solid fa-xmark"></i>
            </button>

            <img [src]="activeModalProject()?.imageUrl" [alt]="activeModalProject()?.title" class="w-full h-64 object-cover rounded-xl mb-6">
            
            <span class="text-xs uppercase tracking-widest text-cyan-400 font-bold">
              {{ activeModalProject()?.category }}
            </span>
            
            <h3 class="text-2xl font-bold text-white font-heading mt-1">
              {{ activeModalProject()?.title }}
            </h3>

            <p class="text-slate-300 text-sm mt-4 leading-relaxed font-light">
              {{ activeModalProject()?.description }}
            </p>

            <div class="mt-6">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technologies Used</h4>
              <div class="flex flex-wrap gap-2">
                @for (tag of activeModalProject()?.parsedTags; track tag) {
                  <span class="tech-badge py-1 px-3 text-xs">{{ tag }}</span>
                }
              </div>
            </div>

            <div class="flex items-center gap-4 mt-8 pt-6 border-t border-slate-800">
              @if (activeModalProject()?.liveDemoUrl) {
                <a [href]="activeModalProject()?.liveDemoUrl" target="_blank" class="btn-primary text-xs">
                  <i class="fa-solid fa-globe"></i> Visit Live Demo
                </a>
              }
              @if (activeModalProject()?.gitHubUrl) {
                <a [href]="activeModalProject()?.gitHubUrl" target="_blank" class="btn-secondary text-xs">
                  <i class="fa-brands fa-github"></i> View GitHub Code
                </a>
              }
            </div>

          </div>
        </div>
      }

    </section>
  `
})
export class ProjectsComponent {
  private projectsSignal = signal<Project[]>([]);
  searchQuery = '';

  @Input() set projects(val: Project[]) {
    this.projectsSignal.set(val || []);
  }

  selectedCategory = signal<string>('All');
  activeModalProject = signal<Project | null>(null);

  categories = computed(() => {
    const list = this.projectsSignal();
    const cats = Array.from(new Set(list.map(p => p.category)));
    return ['All', ...cats];
  });

  filteredProjects = computed(() => {
    const cat = this.selectedCategory();
    const query = this.searchQuery.toLowerCase().trim();
    let list = this.projectsSignal();

    if (cat !== 'All') {
      list = list.filter(p => p.category === cat);
    }

    if (query) {
      list = list.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tagsJson.toLowerCase().includes(query)
      );
    }

    return list;
  });

  openModal(p: Project) {
    this.activeModalProject.set(p);
  }

  closeModal() {
    this.activeModalProject.set(null);
  }
}
