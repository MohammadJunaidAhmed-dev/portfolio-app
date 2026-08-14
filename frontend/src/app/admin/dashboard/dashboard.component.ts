import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio.service';
import { AdminService } from '../../core/services/admin.service';
import { AuthService } from '../../core/services/auth.service';
import { Project, Skill, Experience, ContactMessage, ProfileInfo } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      <!-- Left Admin Sidebar -->
      <aside class="w-full md:w-64 glass-nav border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div>
          <!-- Brand -->
          <div class="flex items-center gap-3 mb-8">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-black text-lg">
              J
            </div>
            <div>
              <h2 class="text-sm font-bold text-white font-heading">Admin Dashboard</h2>
              <span class="text-[10px] text-cyan-400 font-mono">v1.0.0 • .NET + Angular</span>
            </div>
          </div>

          <!-- Nav Items -->
          <nav class="space-y-1 text-xs font-semibold">
            <button 
              (click)="activeTab.set('overview')" 
              [class]="activeTab() === 'overview' ? 'w-full text-left px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-3' : 'w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/50 flex items-center gap-3'">
              <i class="fa-solid fa-chart-pie"></i> Overview
            </button>
            <button 
              (click)="activeTab.set('projects')" 
              [class]="activeTab() === 'projects' ? 'w-full text-left px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-3' : 'w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/50 flex items-center gap-3'">
              <i class="fa-solid fa-diagram-project"></i> Projects ({{ projects().length }})
            </button>
            <button 
              (click)="activeTab.set('skills')" 
              [class]="activeTab() === 'skills' ? 'w-full text-left px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-3' : 'w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/50 flex items-center gap-3'">
              <i class="fa-solid fa-code"></i> Skills ({{ skills().length }})
            </button>
            <button 
              (click)="activeTab.set('experiences')" 
              [class]="activeTab() === 'experiences' ? 'w-full text-left px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-3' : 'w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/50 flex items-center gap-3'">
              <i class="fa-solid fa-timeline"></i> Timeline ({{ experiences().length }})
            </button>
            <button 
              (click)="activeTab.set('messages')" 
              [class]="activeTab() === 'messages' ? 'w-full text-left px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-between' : 'w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/50 flex items-center justify-between'">
              <span class="flex items-center gap-3"><i class="fa-solid fa-envelope"></i> Messages</span>
              @if (unreadCount() > 0) {
                <span class="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {{ unreadCount() }}
                </span>
              }
            </button>
            <button 
              (click)="activeTab.set('profile')" 
              [class]="activeTab() === 'profile' ? 'w-full text-left px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-3' : 'w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/50 flex items-center gap-3'">
              <i class="fa-solid fa-user-gear"></i> Profile Settings
            </button>
          </nav>
        </div>

        <!-- Sidebar Bottom Controls -->
        <div class="pt-6 border-t border-slate-800/80 space-y-3">
          <a href="/" target="_blank" class="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-2">
            <i class="fa-solid fa-globe"></i> View Live Site
          </a>
          <button (click)="logout()" class="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-2">
            <i class="fa-solid fa-right-from-bracket"></i> Logout Admin
          </button>
        </div>
      </aside>

      <!-- Main Dashboard Content -->
      <main class="flex-1 p-6 sm:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        
        <!-- Status Toast -->
        @if (statusMessage()) {
          <div class="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center justify-between">
            <span><i class="fa-solid fa-circle-check mr-2"></i>{{ statusMessage() }}</span>
            <button (click)="statusMessage.set(null)" class="text-slate-400 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
          </div>
        }

        <!-- TAB 1: OVERVIEW -->
        @if (activeTab() === 'overview') {
          <div class="space-y-8">
            <div>
              <h1 class="text-3xl font-extrabold text-white font-heading">Dashboard Overview</h1>
              <p class="text-xs text-slate-400 mt-1">Welcome back, Administrator. Here's a snapshot of your portfolio.</p>
            </div>

            <!-- Stats Counter Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="glass-panel p-6 border border-slate-800">
                <div class="flex items-center justify-between text-slate-400">
                  <span class="text-xs font-semibold uppercase">Total Projects</span>
                  <i class="fa-solid fa-diagram-project text-cyan-400"></i>
                </div>
                <div class="text-3xl font-bold text-white mt-2 font-heading">{{ projects().length }}</div>
              </div>

              <div class="glass-panel p-6 border border-slate-800">
                <div class="flex items-center justify-between text-slate-400">
                  <span class="text-xs font-semibold uppercase">Skills Matrix</span>
                  <i class="fa-solid fa-code text-indigo-400"></i>
                </div>
                <div class="text-3xl font-bold text-white mt-2 font-heading">{{ skills().length }}</div>
              </div>

              <div class="glass-panel p-6 border border-slate-800">
                <div class="flex items-center justify-between text-slate-400">
                  <span class="text-xs font-semibold uppercase">Total Inquiries</span>
                  <i class="fa-solid fa-envelope text-purple-400"></i>
                </div>
                <div class="text-3xl font-bold text-white mt-2 font-heading">{{ messages().length }}</div>
              </div>

              <div class="glass-panel p-6 border border-slate-800">
                <div class="flex items-center justify-between text-slate-400">
                  <span class="text-xs font-semibold uppercase">Unread Messages</span>
                  <i class="fa-solid fa-bell text-rose-400"></i>
                </div>
                <div class="text-3xl font-bold text-rose-400 mt-2 font-heading">{{ unreadCount() }}</div>
              </div>
            </div>

            <!-- Quick Actions Bar -->
            <div class="glass-panel p-6 border border-slate-800">
              <h3 class="text-sm font-bold text-white mb-4">Quick Content Actions</h3>
              <div class="flex flex-wrap gap-4">
                <button (click)="openProjectModal()" class="btn-primary text-xs">
                  <i class="fa-solid fa-plus"></i> Add New Project
                </button>
                <button (click)="openSkillModal()" class="btn-secondary text-xs">
                  <i class="fa-solid fa-plus"></i> Add New Skill
                </button>
                <button (click)="openExperienceModal()" class="btn-secondary text-xs">
                  <i class="fa-solid fa-plus"></i> Add Timeline Entry
                </button>
              </div>
            </div>
          </div>
        }

        <!-- TAB 2: PROJECTS MANAGER -->
        @if (activeTab() === 'projects') {
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-bold text-white font-heading">Manage Showcase Projects</h1>
                <p class="text-xs text-slate-400 mt-1">Add, update, or remove portfolio showcase projects.</p>
              </div>
              <button (click)="openProjectModal()" class="btn-primary text-xs">
                <i class="fa-solid fa-plus"></i> Add Project
              </button>
            </div>

            <div class="glass-panel overflow-x-auto border border-slate-800">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th class="p-4">Project Title</th>
                    <th class="p-4">Category</th>
                    <th class="p-4">Featured</th>
                    <th class="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800 text-slate-300">
                  @for (p of projects(); track p.id) {
                    <tr class="hover:bg-slate-900/40">
                      <td class="p-4 font-bold text-white flex items-center gap-3">
                        <img [src]="p.imageUrl" class="w-10 h-10 rounded-lg object-cover">
                        <span>{{ p.title }}</span>
                      </td>
                      <td class="p-4"><span class="tech-badge">{{ p.category }}</span></td>
                      <td class="p-4">
                        @if (p.featured) {
                          <span class="text-emerald-400 font-bold"><i class="fa-solid fa-check mr-1"></i>Yes</span>
                        } @else {
                          <span class="text-slate-500">No</span>
                        }
                      </td>
                      <td class="p-4 space-x-2">
                        <button (click)="editProject(p)" class="text-cyan-400 hover:text-cyan-300 font-semibold">Edit</button>
                        <button (click)="deleteProject(p.id)" class="text-rose-400 hover:text-rose-300 font-semibold">Delete</button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }

        <!-- TAB 3: SKILLS MANAGER -->
        @if (activeTab() === 'skills') {
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-bold text-white font-heading">Manage Technical Skills</h1>
                <p class="text-xs text-slate-400 mt-1">Configure tech stack proficiency ratings and categories.</p>
              </div>
              <button (click)="openSkillModal()" class="btn-primary text-xs">
                <i class="fa-solid fa-plus"></i> Add Skill
              </button>
            </div>

            <div class="glass-panel overflow-x-auto border border-slate-800">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th class="p-4">Skill Name</th>
                    <th class="p-4">Category</th>
                    <th class="p-4">Proficiency</th>
                    <th class="p-4">Years Exp</th>
                    <th class="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800 text-slate-300">
                  @for (s of skills(); track s.id) {
                    <tr class="hover:bg-slate-900/40">
                      <td class="p-4 font-bold text-white">{{ s.name }}</td>
                      <td class="p-4">{{ s.category }}</td>
                      <td class="p-4 font-mono font-bold text-cyan-400">{{ s.proficiencyPercentage }}%</td>
                      <td class="p-4">{{ s.yearsOfExperience }} Years</td>
                      <td class="p-4 space-x-2">
                        <button (click)="editSkill(s)" class="text-cyan-400 hover:text-cyan-300 font-semibold">Edit</button>
                        <button (click)="deleteSkill(s.id)" class="text-rose-400 hover:text-rose-300 font-semibold">Delete</button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }

        <!-- TAB 4: EXPERIENCES MANAGER -->
        @if (activeTab() === 'experiences') {
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-bold text-white font-heading">Manage Timeline</h1>
                <p class="text-xs text-slate-400 mt-1">Add or edit career positions and education.</p>
              </div>
              <button (click)="openExperienceModal()" class="btn-primary text-xs">
                <i class="fa-solid fa-plus"></i> Add Entry
              </button>
            </div>

            <div class="glass-panel overflow-x-auto border border-slate-800">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th class="p-4">Title / Role</th>
                    <th class="p-4">Company / Org</th>
                    <th class="p-4">Period</th>
                    <th class="p-4">Type</th>
                    <th class="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800 text-slate-300">
                  @for (e of experiences(); track e.id) {
                    <tr class="hover:bg-slate-900/40">
                      <td class="p-4 font-bold text-white">{{ e.title }}</td>
                      <td class="p-4">{{ e.company }}</td>
                      <td class="p-4 text-cyan-400 font-mono">{{ e.period }}</td>
                      <td class="p-4">{{ e.type }}</td>
                      <td class="p-4 space-x-2">
                        <button (click)="editExperience(e)" class="text-cyan-400 hover:text-cyan-300 font-semibold">Edit</button>
                        <button (click)="deleteExperience(e.id)" class="text-rose-400 hover:text-rose-300 font-semibold">Delete</button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }

        <!-- TAB 5: MESSAGES INBOX -->
        @if (activeTab() === 'messages') {
          <div class="space-y-6">
            <div>
              <h1 class="text-2xl font-bold text-white font-heading">Received Contact Inquiries</h1>
              <p class="text-xs text-slate-400 mt-1">View messages submitted by users through the public contact form.</p>
            </div>

            <div class="space-y-4">
              @for (msg of messages(); track msg.id) {
                <div class="glass-panel p-6 border border-slate-800 space-y-3" [ngClass]="{'border-l-4 border-l-cyan-400': !msg.isRead}">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-base font-bold text-white font-heading">{{ msg.subject || 'No Subject' }}</h3>
                      <p class="text-xs text-slate-400 mt-0.5">From: <strong class="text-slate-200">{{ msg.name }}</strong> ({{ msg.email }})</p>
                    </div>
                    <div class="flex items-center gap-3">
                      <button (click)="toggleRead(msg.id!)" class="text-xs font-semibold text-slate-300 hover:text-cyan-400">
                        <i class="fa-solid" [ngClass]="msg.isRead ? 'fa-envelope-open' : 'fa-envelope'"></i>
                        {{ msg.isRead ? 'Mark Unread' : 'Mark Read' }}
                      </button>
                      <button (click)="deleteMessage(msg.id!)" class="text-xs font-semibold text-rose-400 hover:text-rose-300">
                        <i class="fa-solid fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                  <p class="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl font-light">
                    {{ msg.message }}
                  </p>
                  <div class="text-[10px] text-slate-500 font-mono">Received: {{ msg.sentAt }}</div>
                </div>
              }
            </div>
          </div>
        }

        <!-- TAB 6: PROFILE SETTINGS -->
        @if (activeTab() === 'profile') {
          <div class="space-y-6">
            <div>
              <h1 class="text-2xl font-bold text-white font-heading">Profile & Portfolio Settings</h1>
              <p class="text-xs text-slate-400 mt-1">Update your bio, contact information, avatar URL, and social links.</p>
            </div>

            <form (ngSubmit)="saveProfile()" class="glass-panel p-8 border border-slate-800 space-y-6">
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" [(ngModel)]="profileData.fullName" name="fullName" class="form-input">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Title / Designation</label>
                  <input type="text" [(ngModel)]="profileData.title" name="title" class="form-input">
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Bio / Professional Summary</label>
                <textarea [(ngModel)]="profileData.bio" name="bio" rows="4" class="form-input resize-none"></textarea>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Contact Email</label>
                  <input type="email" [(ngModel)]="profileData.contactEmail" name="contactEmail" class="form-input">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Phone</label>
                  <input type="text" [(ngModel)]="profileData.phone" name="phone" class="form-input">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Location</label>
                  <input type="text" [(ngModel)]="profileData.location" name="location" class="form-input">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">GitHub Profile URL</label>
                  <input type="text" [(ngModel)]="profileData.gitHubUrl" name="gitHubUrl" class="form-input">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">LinkedIn Profile URL</label>
                  <input type="text" [(ngModel)]="profileData.linkedInUrl" name="linkedInUrl" class="form-input">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Avatar Image URL</label>
                  <input type="text" [(ngModel)]="profileData.avatarUrl" name="avatarUrl" class="form-input">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Resume PDF URL</label>
                  <input type="text" [(ngModel)]="profileData.resumeUrl" name="resumeUrl" class="form-input">
                </div>
              </div>

              <button type="submit" class="btn-primary text-xs px-8 py-3">
                <i class="fa-solid fa-floppy-disk"></i> Save Profile Settings
              </button>

            </form>
          </div>
        }

      </main>

      <!-- PROJECT MODAL DIALOG -->
      @if (showProjectModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div class="glass-panel w-full max-w-lg p-6 sm:p-8 border border-slate-700 relative">
            <h3 class="text-xl font-bold text-white font-heading mb-4">
              {{ editingProject?.id ? 'Edit Project' : 'Create New Project' }}
            </h3>

            <form (ngSubmit)="saveProject()" class="space-y-4 text-xs">
              <div>
                <label class="block font-semibold text-slate-300 mb-1">Title *</label>
                <input type="text" [(ngModel)]="projectForm.title" name="pTitle" required class="form-input">
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-300 mb-1">Category</label>
                  <input type="text" [(ngModel)]="projectForm.category" name="pCategory" class="form-input" placeholder="Full Stack, Frontend...">
                </div>
                <div>
                  <label class="block font-semibold text-slate-300 mb-1">Featured Project</label>
                  <select [(ngModel)]="projectForm.featured" name="pFeatured" class="form-input">
                    <option [ngValue]="true">Yes</option>
                    <option [ngValue]="false">No</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block font-semibold text-slate-300 mb-1">Image URL / Upload Image</label>
                <div class="flex gap-2">
                  <input type="text" [(ngModel)]="projectForm.imageUrl" name="pImageUrl" class="form-input">
                  <input type="file" (change)="onFileSelected($event)" class="hidden" #fileInput>
                  <button type="button" (click)="fileInput.click()" class="btn-secondary whitespace-nowrap text-[11px]">Upload</button>
                </div>
              </div>

              <div>
                <label class="block font-semibold text-slate-300 mb-1">GitHub URL</label>
                <input type="text" [(ngModel)]="projectForm.gitHubUrl" name="pGitHub" class="form-input">
              </div>

              <div>
                <label class="block font-semibold text-slate-300 mb-1">Live Demo URL</label>
                <input type="text" [(ngModel)]="projectForm.liveDemoUrl" name="pDemo" class="form-input">
              </div>

              <div>
                <label class="block font-semibold text-slate-300 mb-1">Tech Tags (JSON or comma string)</label>
                <input type="text" [(ngModel)]="projectForm.tagsJson" name="pTags" class="form-input" placeholder='["Angular", ".NET 8"]'>
              </div>

              <div>
                <label class="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea [(ngModel)]="projectForm.description" name="pDesc" rows="3" class="form-input resize-none"></textarea>
              </div>

              <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button type="button" (click)="showProjectModal.set(false)" class="btn-secondary text-xs">Cancel</button>
                <button type="submit" class="btn-primary text-xs">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- SKILL MODAL DIALOG -->
      @if (showSkillModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div class="glass-panel w-full max-w-md p-6 sm:p-8 border border-slate-700 relative">
            <h3 class="text-xl font-bold text-white font-heading mb-4">
              {{ editingSkill?.id ? 'Edit Skill' : 'Create New Skill' }}
            </h3>

            <form (ngSubmit)="saveSkill()" class="space-y-4 text-xs">
              <div>
                <label class="block font-semibold text-slate-300 mb-1">Skill Name *</label>
                <input type="text" [(ngModel)]="skillForm.name" name="sName" required class="form-input">
              </div>

              <div>
                <label class="block font-semibold text-slate-300 mb-1">Category</label>
                <input type="text" [(ngModel)]="skillForm.category" name="sCategory" class="form-input" placeholder="Frontend, Backend, Database...">
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-300 mb-1">Proficiency % (0-100)</label>
                  <input type="number" [(ngModel)]="skillForm.proficiencyPercentage" name="sProf" min="0" max="100" class="form-input">
                </div>
                <div>
                  <label class="block font-semibold text-slate-300 mb-1">Years of Exp</label>
                  <input type="number" [(ngModel)]="skillForm.yearsOfExperience" name="sYears" class="form-input">
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button type="button" (click)="showSkillModal.set(false)" class="btn-secondary text-xs">Cancel</button>
                <button type="submit" class="btn-primary text-xs">Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- EXPERIENCE MODAL DIALOG -->
      @if (showExperienceModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div class="glass-panel w-full max-w-md p-6 sm:p-8 border border-slate-700 relative">
            <h3 class="text-xl font-bold text-white font-heading mb-4">
              {{ editingExperience?.id ? 'Edit Timeline Entry' : 'Create Timeline Entry' }}
            </h3>

            <form (ngSubmit)="saveExperience()" class="space-y-4 text-xs">
              <div>
                <label class="block font-semibold text-slate-300 mb-1">Role / Degree Title *</label>
                <input type="text" [(ngModel)]="expForm.title" name="eTitle" required class="form-input">
              </div>

              <div>
                <label class="block font-semibold text-slate-300 mb-1">Company / Institution *</label>
                <input type="text" [(ngModel)]="expForm.company" name="eCompany" required class="form-input">
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-300 mb-1">Time Period</label>
                  <input type="text" [(ngModel)]="expForm.period" name="ePeriod" placeholder="2023 - Present" class="form-input">
                </div>
                <div>
                  <label class="block font-semibold text-slate-300 mb-1">Type</label>
                  <select [(ngModel)]="expForm.type" name="eType" class="form-input">
                    <option value="Work">Work</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block font-semibold text-slate-300 mb-1">Location</label>
                <input type="text" [(ngModel)]="expForm.location" name="eLocation" class="form-input">
              </div>

              <div>
                <label class="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea [(ngModel)]="expForm.description" name="eDesc" rows="3" class="form-input resize-none"></textarea>
              </div>

              <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button type="button" (click)="showExperienceModal.set(false)" class="btn-secondary text-xs">Cancel</button>
                <button type="submit" class="btn-primary text-xs">Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      }

    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  private adminService = inject(AdminService);
  private authService = inject(AuthService);

  activeTab = signal<'overview' | 'projects' | 'skills' | 'experiences' | 'messages' | 'profile'>('overview');
  statusMessage = signal<string | null>(null);

  projects = signal<Project[]>([]);
  skills = signal<Skill[]>([]);
  experiences = signal<Experience[]>([]);
  messages = signal<ContactMessage[]>([]);
  profileData: ProfileInfo = {
    fullName: '', title: '', tagline: '', bio: '', avatarUrl: '', resumeUrl: '',
    contactEmail: '', phone: '', location: '', gitHubUrl: '', linkedInUrl: '', twitterUrl: '', availableForHire: true
  };

  unreadCount = computed(() => this.messages().filter(m => !m.isRead).length);

  // Modals state
  showProjectModal = signal(false);
  editingProject: Partial<Project> | null = null;
  projectForm: Partial<Project> = {};

  showSkillModal = signal(false);
  editingSkill: Partial<Skill> | null = null;
  skillForm: Partial<Skill> = {};

  showExperienceModal = signal(false);
  editingExperience: Partial<Experience> | null = null;
  expForm: Partial<Experience> = {};

  ngOnInit() {
    this.refreshAllData();
  }

  refreshAllData() {
    this.portfolioService.getProjects().subscribe(p => this.projects.set(p));
    this.portfolioService.getSkills().subscribe(s => this.skills.set(s));
    this.portfolioService.getExperiences().subscribe(e => this.experiences.set(e));
    this.adminService.getMessages().subscribe(m => this.messages.set(m));
    this.portfolioService.getProfile().subscribe(pr => this.profileData = pr);
  }

  // --- PROJECTS ---
  openProjectModal() {
    this.editingProject = null;
    this.projectForm = { title: '', category: 'Full Stack', featured: false, tagsJson: '["Angular", ".NET 8"]' };
    this.showProjectModal.set(true);
  }

  editProject(p: Project) {
    this.editingProject = p;
    this.projectForm = { ...p };
    this.showProjectModal.set(true);
  }

  saveProject() {
    if (this.editingProject?.id) {
      this.adminService.updateProject(this.editingProject.id, this.projectForm as Project).subscribe(() => {
        this.statusMessage.set('Project updated successfully!');
        this.showProjectModal.set(false);
        this.refreshAllData();
      });
    } else {
      this.adminService.createProject(this.projectForm).subscribe(() => {
        this.statusMessage.set('New project created successfully!');
        this.showProjectModal.set(false);
        this.refreshAllData();
      });
    }
  }

  deleteProject(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.adminService.deleteProject(id).subscribe(() => {
        this.statusMessage.set('Project deleted.');
        this.refreshAllData();
      });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.adminService.uploadFile(file).subscribe(res => {
        this.projectForm.imageUrl = 'http://localhost:5000' + res.url;
        this.statusMessage.set('Image uploaded successfully!');
      });
    }
  }

  // --- SKILLS ---
  openSkillModal() {
    this.editingSkill = null;
    this.skillForm = { name: '', category: 'Frontend', proficiencyPercentage: 80, yearsOfExperience: 2 };
    this.showSkillModal.set(true);
  }

  editSkill(s: Skill) {
    this.editingSkill = s;
    this.skillForm = { ...s };
    this.showSkillModal.set(true);
  }

  saveSkill() {
    if (this.editingSkill?.id) {
      this.adminService.updateSkill(this.editingSkill.id, this.skillForm as Skill).subscribe(() => {
        this.statusMessage.set('Skill updated successfully!');
        this.showSkillModal.set(false);
        this.refreshAllData();
      });
    } else {
      this.adminService.createSkill(this.skillForm).subscribe(() => {
        this.statusMessage.set('New skill added!');
        this.showSkillModal.set(false);
        this.refreshAllData();
      });
    }
  }

  deleteSkill(id: number) {
    if (confirm('Delete this skill?')) {
      this.adminService.deleteSkill(id).subscribe(() => {
        this.statusMessage.set('Skill removed.');
        this.refreshAllData();
      });
    }
  }

  // --- EXPERIENCES ---
  openExperienceModal() {
    this.editingExperience = null;
    this.expForm = { title: '', company: '', period: '', type: 'Work' };
    this.showExperienceModal.set(true);
  }

  editExperience(e: Experience) {
    this.editingExperience = e;
    this.expForm = { ...e };
    this.showExperienceModal.set(true);
  }

  saveExperience() {
    if (this.editingExperience?.id) {
      this.adminService.updateExperience(this.editingExperience.id, this.expForm as Experience).subscribe(() => {
        this.statusMessage.set('Timeline entry updated!');
        this.showExperienceModal.set(false);
        this.refreshAllData();
      });
    } else {
      this.adminService.createExperience(this.expForm).subscribe(() => {
        this.statusMessage.set('New timeline entry created!');
        this.showExperienceModal.set(false);
        this.refreshAllData();
      });
    }
  }

  deleteExperience(id: number) {
    if (confirm('Delete timeline entry?')) {
      this.adminService.deleteExperience(id).subscribe(() => {
        this.statusMessage.set('Timeline entry deleted.');
        this.refreshAllData();
      });
    }
  }

  // --- MESSAGES ---
  toggleRead(id: number) {
    this.adminService.toggleMessageRead(id).subscribe(() => this.refreshAllData());
  }

  deleteMessage(id: number) {
    if (confirm('Delete message?')) {
      this.adminService.deleteMessage(id).subscribe(() => {
        this.statusMessage.set('Message deleted.');
        this.refreshAllData();
      });
    }
  }

  // --- PROFILE ---
  saveProfile() {
    this.adminService.updateProfile(this.profileData).subscribe(() => {
      this.statusMessage.set('Profile information updated successfully!');
    });
  }

  logout() {
    this.authService.logout();
  }
}
