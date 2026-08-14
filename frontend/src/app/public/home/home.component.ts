import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';
import { ProfileInfo, Project, Skill, Experience } from '../../core/models/portfolio.models';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <app-header></app-header>
      
      @if (isLoading()) {
        <div class="min-h-screen flex flex-col items-center justify-center gap-4">
          <div class="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
          <span class="text-xs uppercase tracking-widest text-slate-400 font-semibold">Loading Portfolio...</span>
        </div>
      } @else {
        <app-hero [profile]="profile()"></app-hero>
        <app-about [profile]="profile()"></app-about>
        <app-skills [skills]="skills()"></app-skills>
        <app-projects [projects]="projects()"></app-projects>
        <app-experience [experiences]="experiences()"></app-experience>
        <app-contact [profile]="profile()"></app-contact>
        <app-footer [profile]="profile()"></app-footer>
      }
    </div>
  `
})
export class HomeComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  profile = signal<ProfileInfo | null>(null);
  projects = signal<Project[]>([]);
  skills = signal<Skill[]>([]);
  experiences = signal<Experience[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.loadAllData();
  }

  private loadAllData() {
    this.portfolioService.getProfile().subscribe({
      next: (p) => this.profile.set(p),
      error: (err) => console.error('Failed to load profile', err)
    });

    this.portfolioService.getProjects().subscribe({
      next: (p) => this.projects.set(p),
      error: (err) => console.error('Failed to load projects', err)
    });

    this.portfolioService.getSkills().subscribe({
      next: (s) => this.skills.set(s),
      error: (err) => console.error('Failed to load skills', err)
    });

    this.portfolioService.getExperiences().subscribe({
      next: (e) => {
        this.experiences.set(e);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load experiences', err);
        this.isLoading.set(false);
      }
    });
  }
}
