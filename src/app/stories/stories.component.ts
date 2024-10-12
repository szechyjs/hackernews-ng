import { Component, inject } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { MatList } from '@angular/material/list';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { HackerNewsService } from '../services/hacker-news.service';
import { StoryComponent } from '../story/story.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [StoryComponent, MatList, AsyncPipe],
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  animations: [
    trigger('stagger', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger(50, [
            animate('1s ease-in', style({ opacity: 1 })),
          ]),
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1 }),
          stagger(50, [
            animate('1s ease-out', style({ opacity: 0 })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class StoriesComponent {
  hackerNews = inject(HackerNewsService);
  stories$: Observable<Item[]>;

  constructor() {
    this.stories$ = this.hackerNews.topStories();
  }

  itemTrack(index: number, item: Item) {
    return item.id;
  }
}
