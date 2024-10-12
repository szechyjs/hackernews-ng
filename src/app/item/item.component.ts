import { Component, Input, inject } from '@angular/core';
import { HackerNewsService } from '../services/hacker-news.service';
import { Item } from '../models/item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
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
}
