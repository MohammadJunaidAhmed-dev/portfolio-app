import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project, Skill, Experience, ContactMessage, ProfileInfo } from '../models/portfolio.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProfile(): Observable<ProfileInfo> {
    return this.http.get<ProfileInfo>(`${this.apiUrl}/profile`);
  }

  getProjects(category?: string, featuredOnly?: boolean): Observable<Project[]> {
    let params: any = {};
    if (category) params.category = category;
    if (featuredOnly) params.featuredOnly = 'true';

    return this.http.get<Project[]>(`${this.apiUrl}/projects`, { params }).pipe(
      map(projects => projects.map(p => {
        try {
          p.parsedTags = JSON.parse(p.tagsJson || '[]');
        } catch {
          p.parsedTags = [];
        }
        return p;
      }))
    );
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`);
  }

  getExperiences(type?: string): Observable<Experience[]> {
    let params: any = {};
    if (type) params.type = type;
    return this.http.get<Experience[]>(`${this.apiUrl}/experiences`, { params });
  }

  sendMessage(message: ContactMessage): Observable<ContactMessage> {
    return this.http.post<ContactMessage>(`${this.apiUrl}/messages`, message);
  }
}
