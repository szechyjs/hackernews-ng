import { Component, inject } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Database, limitToFirst, listVal, objectVal, query, ref } from '@angular/fire/database';
import { Observable, combineLatest, switchMap, tap } from 'rxjs';
import { Item } from '../models/item';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class StoriesComponent {
  private database: Database = inject(Database);
  stories$: Observable<Item[]>;

  constructor() {
    const topStoriesRef = ref(this.database, '/v0/topstories');
    const topQuery = query(topStoriesRef, limitToFirst(30));
    this.stories$ = listVal<number>(topQuery).pipe(
      switchMap((ids) => combineLatest(ids.map((id) => this.getItem(id))))
    );
  }

  getItem(id: number): Observable<Item> {
    const itemRef = ref(this.database, `/v0/item/${id}`);
    return objectVal<Item>(itemRef);
  }

  itemTrack(index: number, item: Item) {
    return item.id;
  }
}
