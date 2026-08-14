import { Component, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../core/services/portfolio.service';
import { ProfileInfo, ContactMessage } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="py-24 relative z-10">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs uppercase tracking-widest text-cyan-400 font-bold">Get In Touch</span>
          <h2 class="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mt-2">
            Let's <span class="gradient-text">Work Together</span>
          </h2>
          <p class="text-slate-400 mt-4 text-sm sm:text-base">
            Have a project in mind or interested in hiring me? Send a message and let's connect!
          </p>
          <div class="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <!-- Left Contact Metadata Cards -->
          <div class="lg:col-span-5 space-y-6">
            
            <div class="glass-panel p-6 flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl shrink-0">
                <i class="fa-solid fa-envelope"></i>
              </div>
              <div>
                <h4 class="font-bold text-white font-heading text-base">Direct Email</h4>
                <p class="text-slate-400 text-xs mt-1">Feel free to drop an email anytime</p>
                <a [href]="'mailto:' + profile?.contactEmail" class="text-cyan-400 font-medium text-sm hover:underline mt-2 inline-block">
                  {{ profile?.contactEmail || 'mjunaid.dev@example.com' }}
                </a>
              </div>
            </div>

            <div class="glass-panel p-6 flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl shrink-0">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <h4 class="font-bold text-white font-heading text-base">Location</h4>
                <p class="text-slate-400 text-xs mt-1">Primary base & Remote availability</p>
                <p class="text-slate-200 text-sm font-medium mt-2">
                  {{ profile?.location || 'San Francisco, CA / Remote' }}
                </p>
              </div>
            </div>

            <div class="glass-panel p-6 flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl shrink-0">
                <i class="fa-solid fa-phone"></i>
              </div>
              <div>
                <h4 class="font-bold text-white font-heading text-base">Phone Number</h4>
                <p class="text-slate-400 text-xs mt-1">Mon - Fri (9am - 6pm EST)</p>
                <p class="text-slate-200 text-sm font-medium mt-2">
                  {{ profile?.phone || '+1 (555) 234-5678' }}
                </p>
              </div>
            </div>

          </div>

          <!-- Right Interactive Contact Form -->
          <div class="lg:col-span-7 glass-panel p-8 sm:p-10 border border-slate-800">
            
            @if (submittedSuccess()) {
              <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4 animate-float">
                <div class="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto">
                  <i class="fa-solid fa-circle-check"></i>
                </div>
                <h3 class="text-2xl font-bold text-white font-heading">Message Received!</h3>
                <p class="text-slate-300 text-sm font-light">
                  Thank you for reaching out. I have received your message and will reply back as soon as possible.
                </p>
                <button (click)="submittedSuccess.set(false)" class="btn-secondary text-xs mt-4">
                  Send Another Message
                </button>
              </div>
            } @else {
              <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="space-y-6">
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Your Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      [(ngModel)]="formData.name" 
                      required 
                      placeholder="John Doe" 
                      class="form-input">
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      [(ngModel)]="formData.email" 
                      required 
                      placeholder="john@example.com" 
                      class="form-input">
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Subject</label>
                  <input 
                    type="text" 
                    name="subject" 
                    [(ngModel)]="formData.subject" 
                    placeholder="Project Inquiry / Job Opportunity" 
                    class="form-input">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Message *</label>
                  <textarea 
                    name="message" 
                    rows="5" 
                    [(ngModel)]="formData.message" 
                    required 
                    placeholder="Write your message details here..." 
                    class="form-input resize-none"></textarea>
                </div>

                @if (errorMessage()) {
                  <div class="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-lg">
                    {{ errorMessage() }}
                  </div>
                }

                <button 
                  type="submit" 
                  [disabled]="isSubmitting() || !contactForm.form.valid" 
                  class="btn-primary w-full justify-center py-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  @if (isSubmitting()) {
                    <i class="fa-solid fa-spinner animate-spin"></i> Sending Message...
                  } @else {
                    Send Message <i class="fa-solid fa-paper-plane"></i>
                  }
                </button>

              </form>
            }

          </div>

        </div>

      </div>
    </section>
  `
})
export class ContactComponent {
  @Input() profile: ProfileInfo | null = null;

  private portfolioService = inject(PortfolioService);

  formData: ContactMessage = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = signal(false);
  submittedSuccess = signal(false);
  errorMessage = signal<string | null>(null);

  onSubmit() {
    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.portfolioService.sendMessage(this.formData).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submittedSuccess.set(true);
        this.formData = { name: '', email: '', subject: '', message: '' };
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to send message. Please try again.');
      }
    });
  }
}
