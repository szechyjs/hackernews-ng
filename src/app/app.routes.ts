import { Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { StoriesComponent } from './stories/stories.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: StoriesComponent },
  { path: 'item/:id', component: ItemComponent }
];
