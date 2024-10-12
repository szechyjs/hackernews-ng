import { Component, Input, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { HackerNewsService } from '../services/hacker-news.service';
import { Comment, Item, Story } from '../models/item';
import { StoryComponent } from '../story/story.component';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [StoryComponent, AsyncPipe, CommentComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  hackerNews = inject(HackerNewsService);
  item$!: Observable<Item>;

  @Input()
  set id(itemId: number) {
    this.item$ = this.hackerNews.getItem(itemId);
  }

  storyCast(item: Item): Story {
    return item as Story;
  }

  commentCast(item: Item): Comment {
    return item as Comment;
  }

  itemKids(item: Item) {
    if (item.type === 'story' || item.type === 'comment') {
      return item.kids;
    }

    return []
  }
}
