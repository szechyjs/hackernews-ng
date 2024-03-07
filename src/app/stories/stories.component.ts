import { Component, inject } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Database, limitToFirst, listVal, objectVal, query as dbQuery, ref } from '@angular/fire/database';
import { Observable, combineLatest, switchMap } from 'rxjs';
import { Item } from '../models/item';

@Component({
  selector: 'app-stories',
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
  private database: Database = inject(Database);
  stories$: Observable<Item[]>;

  constructor() {
    const topStoriesRef = ref(this.database, '/v0/topstories');
    const topQuery = dbQuery(topStoriesRef, limitToFirst(30));
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
