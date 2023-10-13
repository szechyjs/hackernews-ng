import { Component, Input } from '@angular/core';
import { Item } from '../models/item';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent {
  @Input() story!: Item;
  @Input() rank!: number;

  domain(url: string): string {
    try {
      return new URL(url).hostname.replace(/^www\./i, '');
    } catch {
      return '';
    }
  }
}
