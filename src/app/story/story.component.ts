import { Component, Input } from '@angular/core';
import { Story } from '../models/item';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { RouterLink } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-story',
  imports: [RouterLink, TimeagoModule, MatListItem],
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  animations: [
    trigger('score', [
      transition(':increment', animate('2s ease', keyframes([
        style({ transform: 'scale(1)', offset: 0 }),
        style({ transform: 'scale(1.5)', offset: 0.7 }),
        style({ transform: 'scale(1)', offset: 1 }),
      ])))
    ]),
  ],
})
export class StoryComponent {
  @Input() story!: Story;
  @Input() rank!: number;

  domain(url: string): string {
    try {
      return new URL(url).hostname.replace(/^www\./i, '');
    } catch {
      return '';
    }
  }
}
