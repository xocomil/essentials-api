import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Character } from '@rick/api';

@Component({
  selector: 'essentials-api-character',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-icon
          class="status-icon"
          *ngIf="character.status === 'Dead'"
          color="warn"
          fontIcon="hide_source"
        />
        <div
          mat-card-avatar
          class="avatar"
          [style.--avatar-image]="urlImage"
        ></div>
        <mat-card-title>
          {{ character.name }}
        </mat-card-title>
        <mat-card-subtitle>
          {{ character.species }} {{ character.gender | lowercase }} from
          {{ character.origin.name }}
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content class="episode-content">
        <a
          class="episode-link"
          [routerLink]="['/episodes', episodeId]"
          *ngFor="let episodeId of episodeIds"
          >{{ episodeId }}</a
        >
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent {
  @Input({ required: true }) character!: Character;

  protected get urlImage(): string {
    return `url(${this.character.image})`;
  }

  protected get episodeIds(): string[] {
    return this.character.episode.map((episode) => episode.split('/')[5]);
  }
}
